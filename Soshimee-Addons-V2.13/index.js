/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import PogObject from "../PogData";
import Changelog from "../ChangelogLib";
import Settings from "./config";

let dataObject = new PogObject("LividSolver", {
    "firstTime": true,
    "textX": 6,
    "textY": 6,
    "textScale": 1
}, "data.json");

const numToLivid = {
    0: {
        "color": "§f",
        "name": "Vendetta Livid"
    },
    5: {
        "color": "§a",
        "name": "Smile Livid"
    },
    13: {
        "color": "§2",
        "name": "Frog Livid"
    },
    14: {
        "color": "§c",
        "name": "Hockey Livid"
    },
    2: {
        "color": "§d",
        "name": "Crossed Livid"
    },
    10: {
        "color": "§5",
        "name": "Purple Livid"
    },
    7: {
        "color": "§7",
        "name": "Doctor Livid"
    },
    11: {
        "color": "§9",
        "name": "Scream Livid"
    },
    4: {
        "color": "§e",
        "name": "Arcade Livid"
    }
};

const lividNameArr = [
    "Vendetta Livid",
    "Smile Livid",
    "Frog Livid",
    "Hockey Livid",
    "Crossed Livid",
    "Purple Livid",
    "Doctor Livid",
    "Scream Livid",
    "Arcade Livid"
];

const codeToColorName = {
    "§f": "White",
    "§a": "Green",
    "§2": "Dark Green",
    "§c": "Red",
    "§d": "Light Purple",
    "§5": "Dark Purple",
    "§7": "Gray",
    "§9": "Blue",
    "§e": "Yellow"
};

const annoyingMessage = [
    "I am Livid, but I'm not Livid.",
    "I am but a shadow.",
    "Keep looking!",
    "Wrong one!",
    "You look like a real fool right now.",
    "So foolish!",
    "Yikes! Imagine getting that wrong.",
    "They couldn't even find the real Livid, psht!",
    "Catch this!",
    "Only a matter of time!",
    "Unlimited power!",
    "Dodge This!",
    "Silence!",
    "My daggers can pierce through steel!"
];

const firstMessage = [
    `§5§l§nLividSolver 1.0.3`,
    "",
    "§aThank you for installing §5LividSolver§a!",
    "§7use &e/lividsolver §7to open the settings GUI",
    "",
    "§cAll mods is use at your own risk!",
    "",
    "§aIf you have suggestions or found a bug,",
    "§aDM &bIcarusPhantom#9084"
];

const changelogMessage = [
    "&b - Fixed minor bug with the color of livid box that's always rgb!",
];

let allLividFound = false;
let bossStarted = false;
let trueLividColor = null;
let trueLividName = null;
let trueLividEntity = null;
let trueLividNameTag = null;
let said = null;

let red = 1.0;
let green = 0.0;
let blue = 0.0;

const changelog = new Changelog("LividSolver", "1.0.3", changelogMessage.join('\n'));
changelog.writeChangelog({name: "&5&l&n", version: "&e", changelog: "&a"});

register("command", () => {
    Settings.openGUI();
}).setName("lividsolver");

register("renderOverlay", () => {
    if (trueLividNameTag !== null) {
        let entityName = trueLividNameTag.getName();
        if (entityName.includes("Livid") && entityName.length > 5 && entityName.charAt(1) === entityName.charAt(5) && entityName.startsWith(trueLividColor)) {
            if (Settings.lividNameGUI || Settings.lividGUI.isOpen()) {
                new Text(entityName, dataObject.textX, dataObject.textY).setScale(dataObject.textScale).setShadow(true).draw();
            }
        }
    } else if (Settings.lividGUI.isOpen()) {
        new Text("§e﴾ §c§lLivid§r §a7M§c❤ §e﴿", dataObject.textX, dataObject.textY).setScale(dataObject.textScale).setShadow(true).draw();
    }
    if (Settings.lividGUI.isOpen()) {
        new Text("Use ▲ arrow key UP to scale up", Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth("Use ▲ arrow key UP to scale up") / 2), Renderer.screen.getHeight() / 2 - 5).setShadow(true).setScale(1).draw();
        new Text("Use ▼ arrow key DOWN to scale down", Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth("Use ▼ arrow key DOWN to scale down") / 2), Renderer.screen.getHeight() / 2 + 5).setShadow(true).setScale(1).draw();
        new Text("You can use scrollwheel if you using ctjs version 2.0.3 or above", Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth("You can use scrollwheel if you using ctjs version 2.0.3 or above") / 2), Renderer.screen.getHeight() / 2 + 15).setShadow(true).setScale(1).draw();
    }    
});

register("renderEntity", (entity, position, partialTicks, event) => {
    let entityName = entity.getName();
    if (trueLividNameTag !== null) {
        if (entityName.removeFormatting().includes("Livid") && entityName.length > 5 && entityName.charAt(1) === entityName.charAt(5) && !entityName.startsWith(trueLividColor)) {
            if (Settings.hideLividNameTags) {
                cancel(event);
            }
        }
        if (annoyingMessage.includes(entityName.removeFormatting()) && entity.getClassName() === "EntityArmorStand") {
            if (Settings.hideAnnoyingNameTags) {
                cancel(event);
            }
        }
    }
    if (trueLividEntity !== null) {
        if (lividNameArr.includes(entityName.removeFormatting()) && !entityName.removeFormatting().includes(trueLividName) && entity.getClassName() === "EntityOtherPlayerMP") {
            if (Settings.hideLividEntity) {
                cancel(event);
            }
        }
        if (entityName.removeFormatting().includes("Enderman") && entity.getClassName() === "EntityEnderman") {
            if (Settings.hideEndermanEntity) {
                cancel(event);
            }
        }
    }
});

register("renderWorld", (partialTicks) => {
    if (trueLividEntity !== null && Settings.drawBoxLivid) {
        const redColor = Settings.rgbToggled ? red : Settings.boxColor.getRed() / 255;
        const greenColor = Settings.rgbToggled ? green : Settings.boxColor.getGreen() / 255;
        const blueColor = Settings.rgbToggled ? blue : Settings.boxColor.getBlue() / 255;
        if (Settings.boxMode === 0) {
            drawEspBox(trueLividEntity.getRenderX(), trueLividEntity.getRenderY(), trueLividEntity.getRenderZ(), Settings.boxLineWidth, 0.9, 1.9, redColor, greenColor, blueColor, 1, true);
        } else {
            drawInnerEspBox(trueLividEntity.getRenderX(), trueLividEntity.getRenderY(), trueLividEntity.getRenderZ(), 0.9, 1.9, redColor, greenColor, blueColor, 0.5, true);
        }
    }
});

register("worldLoad", () => {
    allLividFound = false;
    trueLividColor = null;
    trueLividName = null;
    trueLividNameTag = null;
    trueLividEntity = null;
    said = null;
    bossStarted = false;
    welcome();
});

register("tick", () => {
    if (Settings.findLivid) {
        findCorrectLivid();
    }
});

register("dragged", (mouseDeltaX, mouseDeltaY, mouseX, mouseY, button) => {
    if (Settings.lividGUI.isOpen()) {
        dataObject.textX = mouseX;
        dataObject.textY = mouseY;
        dataObject.save();
    }
});

register("guiKey", (char, keyCode, gui, event) => {
    if (Settings.lividGUI.isOpen()) {
        if (keyCode == 200) {
            dataObject.textScale += dataObject.textScale < 10 ? 0.1 : 0;
        } else if (keyCode == 208) {
            dataObject.textScale -= dataObject.textScale > 0.1 ? 0.1 : 0;
        }
        dataObject.save();
    }
});

register("scrolled", (mouseX, mouseY, direction) => {
    if (Settings.lividGUI.isOpen()) {
        if (direction == 1) {
            dataObject.textScale += dataObject.textScale < 10 ? 0.1 : 0;
        } else if (direction == -1) {
            dataObject.textScale -= dataObject.textScale > 0 ? 0.1 : 0;
        }
        dataObject.save();
    }
});

function welcome() {
    if (!dataObject.firstTime) return
    setTimeout(() => {
        ChatLib.chat(`§b§l§m${ChatLib.getChatBreak(" ")}`);
        firstMessage.forEach(message => {
            ChatLib.chat(ChatLib.getCenteredText(message));
        })
        ChatLib.chat(`§b§l§m${ChatLib.getChatBreak(" ")}`);
        dataObject.firstTime = false;
        dataObject.save();
    }, 1000)
}

function inDungeon() {
    let scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) });
    let currentDungeonFloor = null;
    for (let line of scoreboard) {
        let match = line.match(/ ⏣ The Catac.+ombs \((.+)\)/);
        if (match) {
            let floor = match[1];
            currentDungeonFloor = parseInt(floor.replace(/[^\d]/g, ""));

        }
    }
    return currentDungeonFloor;
}

function rgb() {
    if (red >= 1.0) {
        if (blue > 0.0) {
            blue = blue - 0.05;
        } else {
            green = green + 0.05;
        }
        if (green >= 1) {
            green = 1;
            red = red - 0.05;
        }
    } else if (green >= 1.0) {
        if (red > 0.0) {
            red = red - 0.05;
        } else {
            blue = blue + 0.05;
        }
        if (blue >= 1) {
            blue = 1;
            green = green - 0.05;
        }
    } else if (blue >= 1.0) {
        if (green > 0.0) {
            green = green - 0.05;
        } else {
            red = red + 0.05;
        }
        if (red >= 1) {
            red = 1;
            blue = blue - 0.05;
        }
    }
}

register("chat", () => {
    if (!allLividFound) {
        bossStarted = true;
    }
}).setChatCriteria("[BOSS] Livid: I respect you for making it to here, but I'll be your undoing.");

function findCorrectLivid() {
    if (!Settings.findLivid) return;
    if (inDungeon() != 5) return;
    let lividArr = [];
    if (!allLividFound) {
        World.getAllEntities().forEach(entity => {
            let entityName = entity.getName();
            if (entityName.endsWith("Livid") && entity.getClassName() === "EntityOtherPlayerMP") {       
                lividArr.push(entity);
                if (lividArr.length === 9) {
                    allLividFound = true;
                }
            }
        })
    }
    if (bossStarted || allLividFound) {
        let lividBlock = World.getBlockAt(5, 108, 42); //205, 108, 242
        if (lividBlock.type.getRegistryName() === "minecraft:stained_glass") {
            trueLividColor = numToLivid[lividBlock.getMetadata()].color;
            trueLividName = numToLivid[lividBlock.getMetadata()].name;
        }
        if (Settings.rgbToggled) {
            rgb();
        }
    }
    if (bossStarted && !allLividFound) {
        World.getAllEntities().forEach(entity => {
            let entityName = entity.getName();
            if (entityName.includes("Livid") && entityName.removeFormatting().includes(trueLividName) && entity.getClassName() === "EntityOtherPlayerMP") {
                trueLividEntity = entity;
            }
        });
    }
    if (allLividFound) {
        World.getAllEntities().forEach(entity => {
            let entityName = entity.getName();
            if (entityName.includes("Livid") && entityName.length > 5 && entityName.charAt(1) === entityName.charAt(5) && entityName.startsWith(trueLividColor)) {
                trueLividNameTag = entity;
                let needSay = null;
                if (said == null) {
                    said = trueLividColor;
                    needSay = 'first';
                } else {
                    if (said !== trueLividColor) {
                        said = trueLividColor;
                        needSay = 'changed';
                    }
                }
                if (needSay == 'first' || needSay == 'changed') {
                    if (Settings.sendCorrectLividChat) {
                        ChatLib.chat(`§5[LividSolver] §fCorrect Livid ${needSay == 'first' ? 'is' : 'changed to'}: §l${trueLividColor}${trueLividName} §r${entityName}`);
                    }
                    if (Settings.sayCorrectLividPartyChat) {
                        ChatLib.say(`/pc LividSolver > Correct Livid color ${needSay == 'first' ? 'is' : 'changed to'}: ${codeToColorName[trueLividColor]} Livid`);
                    }
                }
            }
            if (entityName.includes("Livid") && entityName.removeFormatting().includes(trueLividName) && entity.getClassName() === "EntityOtherPlayerMP") {
                trueLividEntity = entity;
            }
        });
    }
}


// All rendering method stolen from RenderLib
// The reason I'm not import RenderLib is because I need to modify the LineWidth that doesn't supported by RenderLib

const drawEspBox = (x, y, z, lw, w, h, red, green, blue, alpha, phase) => {
    Tessellator.pushMatrix();
    GL11.glLineWidth(lw);
    GlStateManager.func_179129_p(); // disableCullFace
    GlStateManager.func_179147_l(); // enableBlend
    GlStateManager.func_179112_b(770, 771); // blendFunc
    GlStateManager.func_179132_a(false); // depthMask
    GlStateManager.func_179090_x(); // disableTexture2D

    if (phase) {
        GlStateManager.func_179097_i() // disableDepth
    }

    const locations = [
        //    x, y, z    x, y, z
        [
            [0, 0, 0],
            [w, 0, 0],
        ],
        [
            [0, 0, 0],
            [0, 0, w],
        ],
        [
            [w, 0, w],
            [w, 0, 0],
        ],
        [
            [w, 0, w],
            [0, 0, w],
        ],

        [
            [0, h, 0],
            [w, h, 0],
        ],
        [
            [0, h, 0],
            [0, h, w],
        ],
        [
            [w, h, w],
            [w, h, 0],
        ],
        [
            [w, h, w],
            [0, h, w],
        ],

        [
            [0, 0, 0],
            [0, h, 0],
        ],
        [
            [w, 0, 0],
            [w, h, 0],
        ],
        [
            [0, 0, w],
            [0, h, w],
        ],
        [
            [w, 0, w],
            [w, h, w],
        ],
    ];

    locations.forEach((loc) => {
        Tessellator.begin(3).colorize(red, green, blue, alpha);

        Tessellator.pos(x + loc[0][0] - w / 2, y + loc[0][1], z + loc[0][2] - w / 2).tex(0, 0);

        Tessellator.pos(x + loc[1][0] - w / 2, y + loc[1][1], z + loc[1][2] - w / 2).tex(0, 0);

        Tessellator.draw();
    });

    GlStateManager.func_179089_o(); // enableCull
    GlStateManager.func_179084_k(); // disableBlend
    GlStateManager.func_179132_a(true); // depthMask
    GlStateManager.func_179098_w(); // enableTexture2D

    if (phase) {
        GlStateManager.func_179126_j(); // enableDepth
    }
    
    Tessellator.popMatrix();
};

const drawInnerEspBox = (x, y, z, w, h, red, green, blue, alpha, phase) => {
    Tessellator.pushMatrix();
    GL11.glLineWidth(2.0);
    GlStateManager.func_179129_p(); // disableCullFace
    GlStateManager.func_179147_l(); // enableBlend
    GlStateManager.func_179112_b(770, 771); // blendFunc
    GlStateManager.func_179132_a(false); // depthMask
    GlStateManager.func_179090_x(); // disableTexture2D

    if (phase) {
        GlStateManager.func_179097_i() // disableDepth
    }

    w /= 2;

    Tessellator.begin(GL11.GL_QUADS, false);
    Tessellator.colorize(red, green, blue, alpha);

    Tessellator.translate(x, y, z)
        .pos(w, 0, w)
        .pos(w, 0, -w)
        .pos(-w, 0, -w)
        .pos(-w, 0, w)

        .pos(w, h, w)
        .pos(w, h, -w)
        .pos(-w, h, -w)
        .pos(-w, h, w)

        .pos(-w, h, w)
        .pos(-w, h, -w)
        .pos(-w, 0, -w)
        .pos(-w, 0, w)

        .pos(w, h, w)
        .pos(w, h, -w)
        .pos(w, 0, -w)
        .pos(w, 0, w)

        .pos(w, h, -w)
        .pos(-w, h, -w)
        .pos(-w, 0, -w)
        .pos(w, 0, -w)

        .pos(-w, h, w)
        .pos(w, h, w)
        .pos(w, 0, w)
        .pos(-w, 0, w)
        .draw();

    GlStateManager.func_179089_o(); // enableCull
    GlStateManager.func_179084_k(); // disableBlend
    GlStateManager.func_179132_a(true); // depthMask
    GlStateManager.func_179098_w(); // enableTexture2D
    if (phase) {
        GlStateManager.func_179126_j(); // enableDepth
    }
            
    Tessellator.popMatrix();
};

if (World.isLoaded()) {
    welcome();
}