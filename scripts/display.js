class Display {

    constructor(songBookName){
        this.songBookName = songBookName
        this.buttonClassNames = 'col-12 col-sm-5 col-md-2 btn btn-dark m-1'

        this.songBookPage = 0
        this.showPianoChords = true


    }


    //
    static progressionName;
    static progressionId;


    addTitle(HTML_ELEMENT_ID) {
        // adds title of songbook to display screen

        let screen = document.getElementById(HTML_ELEMENT_ID);
        let classnames = 'col-12 text-center mt-4'
        let title = document.createElement('h1')
        title.innerText = this.songBookName
        title.className = classnames
        screen.appendChild(title)

    }

    siteTag(HTML_ELEMENT_ID) {
        // adds website tag to screen

        let screen = document.getElementById(HTML_ELEMENT_ID);

        let keyboardDisplay = document.createElement('div')
        keyboardDisplay.id = 'siteTagKeyboard'
        keyboardDisplay.className = 'col-12 d-flex justify-content-center'
        screen.appendChild(keyboardDisplay)

        Keyboard.drawKeyboard('siteTagKeyboard','tonalityOfE','')
        Keyboard.paintKeys(['E'],'tonalityOfE')


        let website = document.createElement('a')
        website.innerText = 'tonalityofe.com'
        website.href = 'https://www.tonalityofe.com'
        screen.appendChild(website)
    }

    chordChart(HTML_ELEMENT_ID, ChordBook_Object){
        // creates the chord chart display
        let screen = document.getElementById(HTML_ELEMENT_ID);
        screen.innerHTML = ``

        this.addTitle(HTML_ELEMENT_ID)
        let currentPageData = ChordBook_Object.pages[this.songBookPage]

        let chart = currentPageData.makeChordChartArray(ChordBook_Object.key)


        let timeSignature = Number(currentPageData.timeSignatureNumerator)

        let artistName = document.createElement('h4')
        artistName.innerHTML = ChordBook_Object.artist
        screen.appendChild(artistName)

        let songName = document.createElement('h5')
        songName.innerHTML = ChordBook_Object.songName
        screen.appendChild(songName)

        let songKey = document.createElement('p')
        songKey.innerHTML = `Key of: ${ChordBook_Object.key}`
        screen.appendChild(songKey)

        let songSectionTitle = document.createElement('h3')
        songSectionTitle.innerHTML = currentPageData.pageName
        songSectionTitle.className = 'font-monospace text-nowrap'

        screen.appendChild(songSectionTitle)

        if (this.showPianoChords === true) {
            this.pianoChordScreen(HTML_ELEMENT_ID, ChordBook_Object)
        }



        let beats = 0;
        // counting up how many beats are in the progression (sum of form array)
        let formArray = currentPageData.form.split('~')
        for (let i=0 ; i < formArray.length; i++) {
            beats += Number(formArray[i])
        }

        let measures = Math.floor(beats / timeSignature)

        let counter = 0
        //  to keep track of which input were using from chart
        for (let i = 0; i < measures; i++){


            let chordChartRow = document.createElement('p')

            chordChartRow.className = 'font-monospace text-nowrap bg-dark text-white border-dark rounded'



            let lyricsRow = document.createElement('p')
            lyricsRow.className = 'font-monospace text-nowrap text-dark border border-dark rounded'




            for (let j=0; j< timeSignature; j++) {

                let chartInput = chart[counter][0]
                let lyricsInput = chart[counter][1]


                let addedSpace = `&nbsp`
                // adding empty space to paragraph to space out chords
                let spaceAdded = 14 - chartInput.length
                for (let i = 0; i< spaceAdded; i++ ) {
                    chartInput += addedSpace

                }

                spaceAdded = 14 - lyricsInput.length
                // adding empty space to paragraph to space out lyrics
                for (let i=0; i< spaceAdded; i++) {
                    lyricsInput += addedSpace
                }

                chordChartRow.innerHTML += chartInput
                lyricsRow.innerHTML += lyricsInput
                counter++



            }


            screen.appendChild(chordChartRow)
            screen.appendChild(lyricsRow)



        }

        let pageLeft = document.createElement('button')
        pageLeft.className = this.buttonClassNames
        pageLeft.innerHTML = '<'
        pageLeft.addEventListener('click', () => {

            if (this.songBookPage > 0) {

                this.songBookPage--
                this.chordChart(HTML_ELEMENT_ID,ChordBook_Object)
            }

        })

        let pageRight = document.createElement('button')
        pageRight.className = this.buttonClassNames
        pageRight.innerHTML = '>'
        pageRight.addEventListener('click', () => {

            if (this.songBookPage < ChordBook_Object.pages.length-1) {

                this.songBookPage++
                this.chordChart(HTML_ELEMENT_ID,ChordBook_Object)
            }
        })

        screen.appendChild(pageLeft)
        screen.appendChild(pageRight)

        this.transposeScreenButton(HTML_ELEMENT_ID, ChordBook_Object)
        this.mainScreenButton(HTML_ELEMENT_ID)
        this.siteTag(HTML_ELEMENT_ID)
    }


    mainScreen(HTML_ELEMENT_ID){

        // creates mainscreen to songbook
        let screen = document.getElementById(HTML_ELEMENT_ID);

        screen.innerHTML = ``

        this.addTitle(HTML_ELEMENT_ID)



        let songNames = Object.keys(ChordBook.data)

        // an array with the names of the songs to be made into buttons


        for (let i=0; i<  songNames.length; i++){

            let song = songNames[i]
            let button = document.createElement('button')
            button.className = this.buttonClassNames
            button.innerText = song
            button.id = songNames[i]

            button.addEventListener('click', () =>{

                this.chordChart(HTML_ELEMENT_ID, ChordBook.data[button.id])

            })
            screen.appendChild(button)
        }

        

        this.siteTag(HTML_ELEMENT_ID)

    }

    mainScreenButton(HTML_ELEMENT_ID){

        // creates button that takes user to homescreen
        let screen = document.getElementById(HTML_ELEMENT_ID);
        let button = document.createElement('button')

        button.innerText = 'Home'
        button.className = this.buttonClassNames

        button.addEventListener('click', () => {
            this.mainScreen(HTML_ELEMENT_ID)
        })

        screen.appendChild(button)

    }

    pianoChordScreen(HTML_ELEMENT_ID, ChordBook_Object) {
        // draws piano chords to screen
        let screen= document.getElementById(HTML_ELEMENT_ID)

        let currentPageData = ChordBook_Object.pages[this.songBookPage]


        let chordsArray = currentPageData.chords.split('~')
        chordsArray = Array.from(new Set(chordsArray))
        // reduce array to unique elements

        let key = ChordBook_Object.key

        let chords = new Progression(Tone.toneList[key], chordsArray)


        for (let i=0; i< chordsArray.length;i++) {
            let keyboardId = `keyboard${i}`
            let chordName = document.createElement('p')
            chordName.innerHTML = `${chords.chordProgression[i].name}`
            // screen.appendChild(chordName)
            let chord = chords.chordProgression[i].notes
            Keyboard.drawKeyboard(HTML_ELEMENT_ID,keyboardId,chords.chordProgression[i].name)
            Keyboard.paintKeys(Chord.closedPosition(chord), keyboardId)


        }
    }


    transposeScreen(HTML_ELEMENT_ID, ChordBook_Object) {
        let screen = document.getElementById(HTML_ELEMENT_ID);

        screen.innerHTML = ``
        this.addTitle(HTML_ELEMENT_ID)
        screen.innerHTML += `
        <button type='button' class='${this.buttonClassNames}' id="C">C</button>
        <button type='button' class='${this.buttonClassNames}' id="C#">C#</button>
        <button type='button' class='${this.buttonClassNames}' id="Db">Db</button>
        <button type='button' class='${this.buttonClassNames}' id="D">D</button>
        <button type='button' class='${this.buttonClassNames}' id="Eb">Eb</button>
        <button type='button' class='${this.buttonClassNames}' id="E">E</button>
        <button type='button' class='${this.buttonClassNames}' id="F">F</button>
        <button type='button' class='${this.buttonClassNames}' id="F#">F#</button>
        <button type='button' class='${this.buttonClassNames}' id="G">G</button>
        <button type='button' class='${this.buttonClassNames}' id="Gb">Gb</button>
        <button type='button' class='${this.buttonClassNames}' id="Ab">Ab</button>
        <button type='button' class='${this.buttonClassNames}' id="A">A</button>
        <button type='button' class='${this.buttonClassNames}' id="Bb">Bb</button>
        <button type='button' class='${this.buttonClassNames}' id="B">B</button>
        `

        let buttons = screen.children;
        let buttonsArr = Array.from(buttons);
        for (let i =0; i < buttonsArr.length; i++) {
            buttonsArr[i].addEventListener('click', () => {

                ChordBook_Object.key = buttonsArr[i].id
                this.chordChart(HTML_ELEMENT_ID,ChordBook_Object)

            })

        }

        this.mainScreenButton(HTML_ELEMENT_ID)
        this.siteTag(HTML_ELEMENT_ID)

    }

    transposeScreenButton(HTML_ELEMENT_ID, ChordBook_Object){
        // makes button to go to transpose screen
        let screen = document.getElementById(HTML_ELEMENT_ID)
        let transposeButton = document.createElement('button')
        transposeButton.className = this.buttonClassNames
        transposeButton.innerText = 'Change Key'
        transposeButton.addEventListener('click', () => {
            this.transposeScreen(HTML_ELEMENT_ID, ChordBook_Object)
        })

        screen.appendChild(transposeButton)

    }

}