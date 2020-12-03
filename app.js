//Select Item From Dom.
const drums = document.querySelectorAll(".drum");
const slider = document.getElementById("volum_slider");
const auto_music_button = document.getElementById("util_button-auto");
const theme_changer = document.getElementById("util_button-theme");
const color_changer = document.getElementById("util_button-background");

var audio_volum = 0.6;
var auto_music_id;
var auto_music_on = false;


//Animation Function
const animate = (key) => {
    const current_key = document.querySelector(`.${key}`)
    current_key.classList.add('pressed')
    setTimeout (()=>{
        current_key.classList.remove('pressed')
    },250)

}
//Play Music
const playMusic = (path) => {
    const audio = new Audio(path);
    audio.volume = audio_volum;
    audio.play();
}
//Make sound Function
const makeSound = (key) => {
    switch(key) {
        case 'w':
            playMusic("sound/sound-1.mp3");
            break;
        case 'a':
            playMusic("sound/sound-2.mp3");
            break;
        case 's':
            playMusic("sound/sound-3.mp3")
            break;
        case 'd':
            playMusic("sound/sound-4.mp3")
            break;
        case 'j':
            playMusic("sound/sound-5.mp3")
            break;
        case 'k':
            playMusic("sound/sound-6.mp3")
            break;
        case 'l':
            playMusic("sound/sound-7.mp3")
        default:
         console.log("hey Wrong Button");
    }
}


//Drum work function
const handleDrumClick = (e) => {
    var innerHTML = e.target.innerHTML;
    animate(innerHTML);
    makeSound(innerHTML);
    
}

for(let i = 0; i < drums.length; i++) {
    drums[i].addEventListener('click', handleDrumClick)
};

//KeyPress Function
document.addEventListener("keypress", (e)=> {
    const triggerdKey = e.key;
    makeSound(triggerdKey);
    animate(triggerdKey);
})

//Volum Slider
slider.oninput = (e) => {
    audio_volum = e.target.value / 100
}

//Auto Music Button
auto_music_button.addEventListener("click", () => {
    if(auto_music_on) {
        clearInterval(auto_music_id)
        auto_music_on = false
        auto_music_button.innerHTML = "Start Auto Music"
        auto_music_button.classList.remove("auto_music_on");
    }else {
        start_auto_music()
        auto_music_on = true
        auto_music_button.innerHTML = "Stop Auto Music"
        auto_music_button.classList.add("auto_music_on")
    }
})

//Start Auto Music
const start_auto_music = () => {
    auto_music_id = setInterval(() => {
        const letters = ["w", "a", "s", "d", "j", "k", "i"]
        const current_key = letters[Math.floor(Math.random() * letters.length)]
        makeSound(current_key)
        animate(current_key)
    }, 200);
}


//Change theme

    //Theme 1
    const theme_1_bg = "#091921"
    const theme_1_text = "#00fff1"

    //Theme 2
    const theme_2_bg = "#f7c340"
    const theme_2_text = "#2d2d2d"

    const change_theme = (theme) => {
        let root = document.documentElement
        if (theme === "theme_1") {
            root.style.setProperty('--background', theme_1_bg)
            root.style.setProperty('--text', theme_1_text)
        }else {
            root.style.setProperty('--background', theme_2_bg)
            root.style.setProperty('--text', theme_2_text)
        }
    }

    var current_theme = "theme_1"
    theme_changer.addEventListener("click", (e)=>{
        theme_changer.classList.add("change_theme_pressed")
        setTimeout(()=>{
            theme_changer.classList.remove("change_theme_pressed")
        },200)
        if(current_theme == "theme_1") {
            change_theme("theme_2")
            current_theme = "theme_2"
        }else {
            change_theme("theme_1")
            current_theme = "theme_1"
        }
    })


