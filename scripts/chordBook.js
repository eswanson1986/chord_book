class ChordBook {
    constructor(songName,artist, key){

        // a chordBook object instance holds all the data about a song and the pages of the chordBook

        this.songName = songName;
        this.artist = artist
        this.key = key
        this.pages = []
        // pages are the info for the chord charts in the song and will be loaded with progression info objects
    }

    static data = {
        // the static data variable will be used to load in the data of all the songs in the chordbook from a json file which will then load all the chordbook instances.

    }

    // helper function to return the keys of the ChordBook.data object
    static keys() {
        return Object.keys(ChordBook.data)
    }

    static hasSong(songName) {
        // helper function to check if a song is in chordbook data file
        return Object.keys(ChordBook.data).includes(songName)
    }

    static hasPage(songName, pageName){
        // helper function to see if songbook has page name already
        if (ChordBook.hasSong(songName)){

            let pageNames = []


            for (let i =0; i < ChordBook.data[songName].pages.length; i++) {

                pageNames.push(ChordBook.data[songName].pages[i].pageName)
            }

            console.log(pageNames)
            return pageNames.includes(pageName)
        }
        return false
    }

    static addSong(songName, artist, key) {

        if (ChordBook.hasSong(songName)){
            console.log('Error: song already exists')
            return false
        }

        ChordBook.data[songName] = new ChordBook(songName,artist, key)
        console.log(`Success new song ${songName} added`)
        return true
    }

    static deleteSong(songName) {

        if (ChordBook.hasSong(songName)){
            delete ChordBook.data[songName]
            console.log(`Song "${songName}" successfully removed`)
            return
        }

        console.log('File does not exist')

    }

    static deletePage(songName, pageName) {
        // helper method to delete a page from the chordbook
        if (ChordBook.hasPage(songName, pageName)){


            let currentPages = ChordBook.data[songName].pages
            let newPages = []

            for (let i =0; i < currentPages.length; i++) {

                if (currentPages[i].pageName != pageName) {
                    newPages.push(currentPages[i])
                }

            }

            ChordBook.data[songName].pages = newPages
            console.log(`Page "${pageName}" successfully removed`)
            return true

        }

        console.log('Page does not exist')
        return false

    }

    static addPage(songName, pageName, chords, form, time, lyrics) {


        // adds song to chord books songbook
        if (ChordBook.hasSong(songName)) {


            if (ChordBook.hasPage(songName, pageName)) {
                console.log('Error song exists ')
                return
            }


            ChordBook.data[songName].pages.push(new ProgressionInfo(pageName, chords, form, time, lyrics))

            console.log(`successfully added ${pageName} of ${songName}`)
            return


        }
        console.log(`Error: ${songName} not in song book`)
        return

    }

    static async loadData() {
        //loads data from data.json into ChordBook.data
        let dataFile = await fetch('./scripts/data.json')
        let dataFileJSON = await dataFile.json()

        let dataKeys = Object.keys(dataFileJSON)
        for (let i = 0; i < dataKeys.length; i++) {

            let songName = dataKeys[i]
            let artist = dataFileJSON[songName].artist
            let key = dataFileJSON[songName].key

            ChordBook.addSong(songName, artist, key)

            let pagesToAdd = dataFileJSON[songName].pages

            for (let j=0; j < pagesToAdd.length; j++) {

                let pageToAdd = dataFileJSON[songName].pages[j]


                let pageName = pageToAdd.pageName
                let chords = pageToAdd.chords
                let form = pageToAdd.form
                let time = pageToAdd.timeSignatureNumerator
                let lyrics = pageToAdd.lyrics


                ChordBook.addPage(songName, pageName, chords, form, time, lyrics)

            }


        }

    }

    static saveFile(fileName) {
        // saves the state of ChordBook.data to a json file
        var  file = new Blob([JSON.stringify(ChordBook.data)], {type: "application/json"});
        saveAs(file, `${fileName}.json`);
    }



}





