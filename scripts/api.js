class Api {
    /*
    A class to build functions for the browser console based Api to input information 
    into the chordbook. 
    */

    // //////////////////////
    // Api.addSong is a helper method to add a song to the ChordBook that validates inputs 
    // and returns true if the song is added or false if the process is stopped and it is not
    // //////////////////////

    static addSong() {
        let songName = Api.songNameValidator()
        if (songName === false) {
            // occurs when a duplicate song is found and not deleted from the songbook
            console.log('addSong function Aborted.')
            return false
        }

        let artist = Api.artistValidator()
        let key = Api.keyValidator()

        if (key === false) {
            console.log('addSong function Aborted.')
            return false
        }

        ChordBook.addSong(songName, artist, key)
        return true
    }


    static addPage() {

        let currentSongs = Api.showSongs()
        let message = `Input Song to add Page to:\n${currentSongs}`
        let songName = Api.query(message)
        message = `Input: ${songName}`

        if (Api.edit(message)){
            return Api.addPage()
        }


        if (ChordBook.hasSong(songName)) {


            let pageName = Api.pageNameValidator(songName)
            if (pageName === false){
                return false
            }

            let time = Api.timeSigValidator()
            if (time === false) {
                return false
            }

            let key = ChordBook.data[songName].key

            let chords = Api.chordInputValidator(key)

            if (chords === false) {
                return false
            }

            let numChords = chords.split(`~`).length


            let form = Api.formValidator(numChords)

            if (form === false) {
                return false
            }

            let formArray = form.split('~')
            let numBeats = 0
            for (let i =0; i< formArray.length; i++) {
                numBeats += Number(formArray[i])
            }

            let lyrics = Api.lyricsValidator(numBeats)

            if (lyrics === false) {
                return false
            }

            /*
            will need to fix below ... a little hacky.
            */

            let testDisplay = new Display(`Test Display`)
            let testChordBook = new ChordBook(songName, `Test`, key)
            testChordBook.pages.push(new ProgressionInfo(pageName, chords, form, time, lyrics))

            testDisplay.chordChart('mainScreen',testChordBook)

            message = `A sample of your chord chart is on the screen do you want to add it to the ChordBook?`
            let abort = Api.abort(message)

            if (abort) {

                console.log(`New page not added.`)

                return false

            }

            ChordBook.addPage(songName, pageName, chords, form, time, lyrics)
            return true

        }

        console.log(`Error: Song does not Exist. Add song before adding page`)
        return false
    }


    ///////////////////
    // Helper Methods for addSong & addPage
    // ///////////////


    // ///////////////////////////////
    // Api.keyValidator is a helper method to confirm that a valid musical key is entered for the song
    // If the user doesn't enter a valid key and chooses to quit the function returns false
    // /////////////////////////////

    static keyValidator() {
        
        let message = `Please enter the Key your Song is in.\nThe input is case Sensitive.('Enter C# not c#')`
        let key = Api.query(message)
        if (Object.keys(Tone.toneList).includes(key)) {
            return key
        }

        let errorMessage = `Invalid Input. Please Try Again`

        if (Api.abort(errorMessage)) {
            return false
        }

        return Api.keyValidator()
    }

    // ///////////////////////////////
    // Api.songNameValidator is a helper method for adding a song which returns A user entered string
    // trimmed of whitespace that will be used to index the new song.
    // If the user entered string matches an existing entry in the index they are
    // asked if they want to delete it and if they choose not to the method returns false
    // otherwise the method deletes the current index and returns the string
    // //////////////////////////////

    static songNameValidator() {
        // helper method to validate adding song names 
        let currentSongs = Api.showSongs()
        let message = `Please Enter the Name for the song you are adding:`
        message = `${message}\n${currentSongs}`

        let songName = Api.query(message)
        message = `You Entered: ${songName}`

        if (Api.edit(message)) {
            return Api.songNameValidator()
        }


        if (ChordBook.hasSong(songName)) {

            message =`Chord book already has song ${songName}\nProceeding will delete the current copy.` 

            if (Api.abort(message)) {

                return false
            }

            ChordBook.deleteSong(songName)
            return songName



        }

        return songName

    }

    // /////////////
    // Api.timeSigValidator is a helper method that returns the user inputted string of 3 or 4 that will be used as the timeSignatureNumerator attribute
    // in the Progressioninfo object that constructs the chord book or false if the user Aborts the process before entering the string.
    // /////////////

    static timeSigValidator() {
        let message = `Enter How many beats are in the measure?\n\nAcceptable input: 3 or 4`
        let time = Api.query(message)
        if (time === '3' || time === '4') {
            return time
        }

        let errorMessage = `'${time}' is not a valid input`
        if (Api.abort(errorMessage)) {
            return false
        }

        return Api.timeSigValidator()
    }

    // /////////////
    // Api.artistValidator is a helper method that returns the user inputted artist name as a string trimmed of whitespace
    // /////////////

    static artistValidator() {

        let message = `Please enter the Name of the artist`
        let artist = Api.query(message)

        message = `You Entered: ${artist}`

        if (Api.edit(message)) {

            return Api.artistValidator()

        }

        return artist

    }

    // ///////////////////////////////
    // Api.pageNameValidator is a helper method for adding a page to a song which returns A user entered string
    // trimmed of whitespace if completed successfully or false if the function does not complete as intended 
    // which can occur when 1) the song name doesn't exist 2) the page name exists and the user doesn't delete it
    // //////////////////////////////

    static pageNameValidator(songName) {
        // helper method to validate if the page name exists

        if (ChordBook.hasSong(songName)) {

            let message = `Please Input a name for the new page:\n`
            let currentPages = Api.showPages(songName)
            message = `${message}\n${currentPages}`

            let newPageName = Api.query(message)
            message = `Your Input was ${newPageName}`

            if (Api.edit(message)) {
                return Api.pageNameValidator(songName)
            }

            if (ChordBook.hasPage(songName, newPageName)) {

                let message =`Chord book already has page ${newPageName}\nProceeding will delete the current copy.`

                if (Api.abort(message)) {
                    return false
                }

                ChordBook.deletePage(songName, newPageName)
                return newPageName
            }

            return newPageName


        }
        return false

    }


    // ///////////////////////////////
    // Api.chordInputValidator is a helper method for validating the and returning input string for the songs chords.
    // trimmed of whitespace.
    // It has one mandatory variable (key) which needs to be a valid string supplied by Api.keyValidator()
    // If the user enters an invalid string it will prompt them to retry
    // If the user doesn't enter valid input and chooses to quit the method returns false.
    // //////////////////////////////

    static chordInputValidator(key) {


        let message = `Chord Input:\nYour songs key is ${key}\nNow input the chords\n`

        let chord = Api.query(message)

        let chordsArray = chord.split('~')

        let testProgression = new Progression(Tone.toneList[key], chordsArray)
        // attempt to make a progression with chords input. and test if the chord progression attribute is false.

        if (testProgression.chordProgression === false) {

            let errorMessage = `Invalid Input.`


            if (Api.abort(errorMessage)) {
                return false
            }

            return Api.chordInputValidator(key)
        }



        return chord

    }

  
    // ///////////////////////////////
    // Api.lyricsValidator is a helper method for returning a user inputted string for a section of lyrics in the ChordBook 
    // trimmed of whitespace.
    // //////////////////////////////

    static lyricsValidator(numBeats) {

        let message = `Please input Lyrics for the section`
        let lyrics = Api.query(message)
        let lyricsArray = lyrics.split('~')

        if (Api.edit(lyrics)) {
            return Api.lyricsValidator()
        }

        if (lyricsArray.length != numBeats) {

            let errorMessage = `Invalid Input\nLyrics array length ${lyricsArray.length}, expected ${numBeats}`
            if (Api.abort(errorMessage)) {
                return false
            }

            return Api.lyricsValidator(numBeats)

        }

        return lyrics


    }

    // ///////////////////////////////
    // Api.formValidator is a helper method that returns a string trimmed of whitespace that is valid for the form attribute
    // number of chords is how many chords are in the progression.
    // //////////////////////////////

    static formValidator(numChords){


        let message = `Please enter the form string\n`
        let form = Api.query(message)
        let errorMessage = `invalid input`
        let formArray = form.split('~')

        for (let i = 0; i < formArray.length; i++) {

            if (isNaN(formArray[i])) {

                if (Api.abort(errorMessage)) {
                    return false
                }

                return Api.formValidator(numChords)
            }
        }

        if (formArray.length != numChords) {

            if (Api.abort(errorMessage)) {
                return false
            }

            return Api.formValidator(numChords)


        }

        return form




    }

    // ///////////////////////////////////
    // Api.showSongs is a helper method to return a string with a list of keys to the ChordBook.data object to the display prompt
    // //////////////////////////////////////


    static showSongs() {

        let songsArray = Object.keys(ChordBook.data)
        let message = `Songs currently in ChordBook:\n`

        for (let i=0; i < songsArray.length; i++) {

            message += `${i+1}) ${songsArray[i]}\n`
        }

        return message
    }

    // //////////////////////////////////////
    // Api.showPages is a helper method to return a string with a list of elements in the Array ChordBook.data[songName].pages
    // if ChordBook.data[songName] does not exist the method returns false
    // //////////////////////////////////////

    static showPages(songName) {
        if (ChordBook.hasSong(songName)) {

            let pagesArray = ChordBook.data[songName].pages
            let message = `Pages currently in ${songName}:\n`

            for (let i = 0; i< pagesArray.length; i++) {
                message += `${i+1}) ${pagesArray[i].pageName}\n`
            }

            return message
        }
        return false
    }

    // ///////////
    // Api.query is a helper method used to return a JS prompt trimmed of whitespace
    // ///////////

    static query(message){
        return prompt(message).trim()
    }

    // /////////////////
    // Api.abort is a helper method to prompt the user if they want to Abort a process
    // it returns true if the user enters 'A' (case insensitive) and false for 'C' (case insensitive)
    // any other input recurses the function.
    // /////////////////

    static abort(message) {

        let abort = Api.query(`${message}\n\n\nInput A to Abort or C to Continue`)

        if (abort.toUpperCase() === 'A') {
            return true
        }

        if (abort.toUpperCase() === `C`) {
            return false
        }

        return Api.abort(message)

    }

    // /////////////////
    // Api.edit is a helper method to prompt the user to if they want to edit an input it will return true to E (case insensitive)
    // and false for 'C' (case insensitive).
    // any other input recurses the function.
    // /////////////////

    static edit(message) {

        let confirm = Api.query(`${message}\n\nInput E to Edit or C to confirm input.`)

        if (confirm.toUpperCase() === 'E') {
            return true
        }

        if (confirm.toUpperCase() === `C`) {
            return false
        }

        return Api.edit(message)
    }

}