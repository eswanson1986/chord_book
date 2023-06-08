class Keyboard {

    static drawKeyboard(HTML_ELEMENT_ID,keyboard_id,keyboard_name){
        // draws keyboard on element id
        let screen = document.getElementById(HTML_ELEMENT_ID);
        
        let newDiv = document.createElement('div')
        newDiv.className = 'col-5'
        newDiv.innerHTML += `
        <p>${keyboard_name}</p>
        <div class = "keyboard " id="${keyboard_id}">
            <div class = "white"></div>
            <div class = "black"></div>
            <div class = "white" id="G Abb F##"></div>
            <div class = "black" id="Ab G#"></div>
            <div class = "white" id="A Bbb G##"></div>
            <div class = "black" id="Bb A#"></div>
            <div class = "white" id="B Cb A##"></div>
            <div class ="white"  id="C B# Dbb"></div>
            <div class = "black" id="C# Db"></div>
            <div class = "white" id="D C## Ebb"></div>
            <div class = "black" id="Eb D#"></div>
            <div class = "white" id="E Fb D##" ></div>
            <div class = "white" id="F Gbb E#"></div>
            <div class = "black" id="F# Gb"></div>
            <div class = "white"></div>
            <div class = "black"></div>
            <div class = "white"></div>
            <div class = "black"></div>
            <div class = "white"></div>
        </div>`

        screen.appendChild(newDiv)

    }

    static paintKeys(chord,id) {
        const keys = document.getElementById(id).children;
        // const keysArr = Array.from(keys);


        for (let j = 0; j < keys.length; j++){
            let notes = keys[j].id.split(" ");

            for (let k =0; k < notes.length; k++) {
                if (chord.includes(notes[k])) {
                keys[j].classList.toggle("chordTone");
                break;
}
            }
        }
    }



    static clearKeys(keyboard_id) {

        const keys = Array.from(document.getElementById(keyboard_id).children);

        for(let i=0; i < keys.length; i++) {
            let keyClasses = Array.from(keys[i].classList)

            if (keyClasses.includes('chordTone')) {
                keys[i].classList.toggle('chordTone')
            }
        }
    }

    static delay(time=0) {

        // a delay function to that returns an empty promise on a delay for use in taking advantage of await syntax for asynchronous functions
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            },time);
        });
    }

    static async playSong(chordArray,keyboard_id) {
        // cycles through rendering painted keys to the keyboard from the supplied 2d array of notes
        for (let i=0; i< chordArray.length; i++) {

            await Keyboard.delay(500)
            Keyboard.clearKeys(keyboard_id)
            Keyboard.paintKeys(chordArray[i],keyboard_id)
            await Keyboard.delay(500)

        }
    }

}