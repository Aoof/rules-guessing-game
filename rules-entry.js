import fs from 'fs';
let i = 0;

class Rule {
    constructor(text, tags, description="") {
        this.id = i++;
        this.text = text;
        this.description = description;
        this.tags = tags;
    }

    toJSON() {
        return {
            id: this.id,
            text: this.text,
            description: this.description,
            tags: this.tags
        };
    }
}

let rules = []

rules.push(new Rule("You must speak in a different accent/voice every time your name is called", ["in-person", "voice-only"]));
rules.push(new Rule("You must mimic whoever you choose, whether it be mockingly or straight up parroting", ["in-person", "non-constant", "voice-only"]));

rules.push(new Rule("You are suddenly monolingual. What's English?", ["in-person", "voice-only"]));
rules[rules.length - 1].description = "You're not allowed to speak in English! Hope that helps! Reroll if that’s the only thing going for you I guess..";

rules.push(new Rule("Did you just get braces? Your lisp is going crazy!", ["in-person", "voice-only"]));

rules.push(new Rule("You have to curse/swear in every sentence you speak.", ["in-person", "voice-only"]));
rules[rules.length - 1].description = "Mom wouldn’t be proud of the way you’re talking right now..";

rules.push(new Rule("Love is in the air! You are now a big flirt!", ["in-person", "voice-only"]));
rules[rules.length - 1].description = "No one is safe from cupid’s arrow, good thing you’re the one holding the bow!";

rules.push(new Rule("What's your name again? I can't seem to remember", ["in-person", "voice-only"]));
rules[rules.length - 1].description = "You’re not allowed to call people by their names! Be creative!";

rules.push(new Rule("You're so confused! Everything you say seems to be a question", ["in-person", "voice-only"]));

rules.push(new Rule("You must repeat the last word you said in your sentence twice.", ["in-person", "voice-only"]));
rules[rules.length - 1].description = "Here’s an example bozo, bozo";

rules.push(new Rule("You are the proud owner of a Walkie Talkie! Begin each sentence with a \"KSSH\" and end it with an \"OVER!\"", ["in-person", "voice-only"]));
rules.push(new Rule("You must only refer to yourself in the third person", ["in-person", "voice-only"]));
rules.push(new Rule("You are now deaf/hard of hearing, poor you", ["in-person", "voice-only"]));

rules.push(new Rule("You are banned from making eye contact with anyone", ["in-person"]));
rules[rules.length - 1].description = "You’re just a lil’ shy person aren’t you?";

rules.push(new Rule("You are infatuated with the first person you looked at after reading this, you are not allowed to look at anybody else", ["in-person"]));
rules[rules.length - 1].description = "To clarify, THEY ARE THE ONLY PERSON YOU ARE ALLOWED TO LOOK AT, NO ONE ELSE!";

rules.push(new Rule("What happened to your fingers? Oh no! You are now wearing invisible boxing gloves, either ask for help, or struggle", ["in-person"]));
rules[rules.length - 1].description = "Your hands are permanently in a fist shape, I wonder how you’ll ever do anything like that, oh well!";

rules.push(new Rule("You are now a Yes Man, \"no\" is not in your vocabulary", ["in-person", "voice-only"]));
rules.push(new Rule("You have forgotten how to laugh normally, change up that giggle!", ["in-person", "voice-only"]));

rules.push(new Rule(
    "Start every sentence with “Uhh..”, “Um..”, “Erm..”, etc.",
    ["in-person", "voice-only"]
));

rules.push(new Rule(
    "You can only speak when interrupting someone, how annoying!",
    ["in-person", "voice-only"]
));

rules.push(new Rule(
    "Act like it’s the first time anyone has ever talked to you, you are over the moon",
    ["in-person", "voice-only"],
    "Embody the loser persona you’ve always kept hidden inside of you!\n“OH! YOU’RE TALKING TO *ME*? OH MY GOSH I NEVER THOUGHT SOMEONE WOULD EVER TALK TO ME!”"
));

rules.push(new Rule(
    "You are the best salesperson ever! Always end your sentence with an advertisement",
    ["in-person", "voice-only"],
    "“Example sentence… And that’s why I LOVE RulerBreakers game made by the wonderful Drew & Aoof”"
));

rules.push(new Rule(
    "Meow after anyone speaks",
    ["in-person", "voice-only"]
));

rules.push(new Rule(
    "You never remember the rules of the game, keep asking about it",
    ["in-person", "voice-only"],
    "“Hey so can someone explain the rules again? I wasn’t paying attention.”\, “Wait, I’m so confused! How do you play?” , etc"
));

rules.push(new Rule(
    "Try to mumble and slur your words in a conversation",
    ["in-person", "voice-only"],
    "I feel bad for whoever was interested in whatever you were trying to say"
));

rules.push(new Rule(
    "Suddenly raise your voice/yell a word in the middle of your sentence",
    ["in-person", "voice-only"],
    "“Example sentence I am TALKING and then I suddenly YELLED, oh this is so SILLY of me!”"
));

// In-person only rules (do not add "voice-only")
rules.push(new Rule(
    "Always walk backwards",
    ["in-person"],
    "HEEHEE"
));

rules.push(new Rule(
    "Before you speak, you have to raise your hand",
    ["in-person"],
    "Ahh the good ol’ school days, feeling nostalgic yet?"
));

rules.push(new Rule(
    "You are deathly afraid of people, act accordingly!",
    ["in-person"],
    "Flinch when someone speaks to you and jolt away when they get close to you"
));

rules.push(new Rule(
    "The first person you look at after reading this is the most hilarious person ever, laugh at everything they say!",
    ["in-person"]
));

fs.writeFileSync('./data/rules.json', JSON.stringify({ rules: rules.map(rule => rule.toJSON()) }, null, 2));
console.log(`Generated ${rules.length} rules.`);
