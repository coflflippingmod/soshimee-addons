import {
    @Vigilant,
    @TextProperty,
    @ColorProperty,
    @ButtonProperty,
    @SwitchProperty,
    @ParagraphProperty,
    @SliderProperty,
    @PercentSliderProperty,
    @DecimalSliderProperty,
    @SelectorProperty,
    Color
} from "../Vigilance/index";

@Vigilant("LividSolver")
class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Settings", "§5§lLividSolver 1.0.3§r\n\n" +
        "§6Created by §bIcarusPhantom§r\n\n" +
        "§e§lCredits§r\n\n" +
        "§aafterfive - base code from M5LividSolver module§r\n\n" +
        "§ciTqxic - Hide livid entity feature")
        this.setSubcategoryDescription("Settings", "A. General", "")
        this.setSubcategoryDescription("Settings", "B. Hider", "")
        this.setSubcategoryDescription("Settings", "C. Draw Box", "")
        this.setSubcategoryDescription("Settings", "D. Name Render", "")
    }

    @SwitchProperty({
        name: "§aFind Correct Livid",
        description: "Find correct livid.",
        category: "Settings",
        subcategory: "A. General"
    })
    findLivid = true;

    @SwitchProperty({
        name: "§bSend Correct Livid in Chat",
        description: "Sends a chat message informing you about livid current color.",
        category : "Settings",
        subcategory: "A. General"
    })
    sendCorrectLividChat = true;

    @SwitchProperty({
        name: "§bSay Correct Livid in Party Chat",
        description: "Say correct livid in party chat.",
        category : "Settings",
        subcategory: "A. General"
    })
    sayCorrectLividPartyChat = false;

    @SwitchProperty({
        name: "§eHide Incorrect Livid NameTag",
        description: "Hide all the incorrect livid nametag.",
        category: "Settings",
        subcategory: "B. Hider"
    })
    hideLividNameTags = true;

    @SwitchProperty({
        name: "§eHide Annoying Message NameTag",
        description: "Hide those annoying message that rendered as nametag.",
        category: "Settings",
        subcategory: "B. Hider"
    })
    hideAnnoyingNameTags = false;

    @SwitchProperty({
        name: "§eHide Incorrect Livid Entity",
        description: "Hide all the incorrect livid entities.",
        category: "Settings",
        subcategory: "B. Hider"
    })
    hideLividEntity = false;

    @SwitchProperty({
        name: "§eHide Incorrect Enderman Entity",
        description: "Hide livid's clones that are enderman entities.",
        category: "Settings",
        subcategory: "B. Hider"
    })
    hideEndermanEntity = false;

    @SwitchProperty({
        name: "§bDraw Box Correct Livid",
        description: "Draws a box around the correct Livid.",
        category: "Settings",
        subcategory: "C. Draw Box"
    })
    drawBoxLivid = true;

    @SelectorProperty({
        name: '§bBox Mode',
        description: 'Select box mode.',
        category: 'Settings',
        subcategory: "C. Draw Box",
        options: ['Outline', 'Box'],
    })
    boxMode = 0;

    @DecimalSliderProperty({
        name: "§aLine Width",
        description: "Change the line width of the box around livid.",
        category : "Settings",
        subcategory: "C. Draw Box",
        minF : 1.0,
        maxF : 10.0,
        decimalPlaces: 1
    })
    boxLineWidth = 2.0;

    @ColorProperty({
        name: "§cBox Color",
        description: "Customize box color.",
        category: "Settings",
        subcategory: "C. Draw Box"
    })
    boxColor = new java.awt.Color(1, 0, 0, 1);; 

    @SwitchProperty({
        name: "§5E§3n§2a§eb§6l§4e §4R§2G§1B",
        description: "Use RGB for box color.",
        category : "Settings",
        subcategory: "C. Draw Box"
    })
    rgbToggled = false;

    @SwitchProperty({
        name: "§9Render Livid Name on GUI",
        description: "Toggle the render for correct livid name in your screen.",
        category : "Settings",
        subcategory: "D. Name Render"
    })
    lividNameGUI = true;

    lividGUI = new Gui(); 
    @ButtonProperty({
        name: "§aMove Livid Name GUI",
        placeholder: "Move",
        category: "Settings",
        subcategory: "D. Name Render"
    })
    nameTagMove() {
        this.lividGUI.open();
    }
}

export default new Settings;