class ProgressionInfo {

    constructor(pageName, chords, form, timeSignatureNumerator, lyrics){
        
        this.pageName = pageName
        this.chords = chords
        this.form = form
        this.timeSignatureNumerator = timeSignatureNumerator
        this.lyrics = lyrics

        /*
        chords are a text string of the roman numerals of the chord progression delimited by ~ ... such as I~IV~V.
        form is a text string delimited by ~ consisting of numbers signifying the number of beats each chord is held for such as 4~4~4
        it must match match chords in length as they will be split an put together to form the chord chart
        the total sum of the array must also be a multiple of the timeSignatureNumerator which will format the measures of the chordchart
        the time signature numerator is simply that so for a song in 4/4 the variable would be the string 4.
        the key is the key of the chord progression.
        lyrics are the lyrics in a string format delimited by ~ there must be as many items in the lyrics as the total of 
        the number of beats in the form. all of these strings will be broken up into arrays by their delimiters and reassembled to format 
        the chord chart later
        */


    }

    makeChordChartArray(key){

        /*
        returns a two dimensional array of the chords and the lyrics for formatting
        */
        let chordChart=[]


        let progression = new Progression(Tone.toneList[key],this.chords.split('~'))
        let lyricsArray = this.lyrics.split('~')
        let formArray = this.form.split('~')


        let counter = 0

        for (let i=0; i < progression.chordProgression.length; i++){

            chordChart.push([progression.chordProgression[i].name, lyricsArray[counter]])
            counter++


            for (let j=0; j < Number(formArray[i])-1; j++){
                chordChart.push(['-', lyricsArray[counter]])
                counter++
            }

        }

        return chordChart
    }

}