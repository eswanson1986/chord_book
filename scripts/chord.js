class Chord {
    constructor(tone, type) {

        if (tone instanceof Tone) {
            this.tone = tone;
        }

        else {
            throw new Error('tone must be instaceof Tone class');
        }

        this.type = type;
        this.name = `${this.tone.root} ${type}`;
        this.intervals = {'Root': this.tone.root};
        this.notes;

        switch (type) {

            case 'Major':

                this.notes = this.tone.majorChord();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                break;

            case 'Minor':

                this.notes = this.tone.minorChord();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                break;

            case 'Augmented':

                this.notes = this.tone.augmentedChord();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Augmented Fifth'] = this.notes[2];
                break;

            case 'Diminished':

                this.notes = this.tone.diminishedChord();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Diminished Fifth'] = this.notes[2];
                break;

            case '7th':

                this.notes = this.tone.dominant7thChord();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                break;

            case 'Major 7th':
                this.notes = this.tone.major7thChord();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Major 7th'] = this.notes[3];
                break;

            case 'Minor 7th':
                this.notes = this.tone.minor7thChord();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                break;

            case 'Half Diminished 7th':
                this.notes = this.tone.halfDiminished7thChord();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Diminished Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                break;

            case 'Diminished 7th':
                this.notes = this.tone.diminished7thChord();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Diminished Fifth'] = this.notes[2];
                this.intervals['Diminished 7th'] = this.notes[3];
                break;

            case 'Ninth':

                this.notes = this.tone.ninthChord();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['Ninth'] = this.notes[4];
                break;

            case 'Minor Ninth':
                this.notes = this.tone.minorNinthChord();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['Ninth'] = this.notes[4];
                break;

            case 'Sus 2':
                this.notes = this.tone.suspended2ndChord();
                this.intervals['Major 2nd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                break;

            case 'Sus 4':
                this.notes = this.tone.suspended4thChord();
                this.intervals['Perfect Fourth'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                break;

            case 'Minor-Major 7th':
                this.notes = this.tone.minorMajor7th();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Major 7th'] = this.notes[3];
                break;

            case 'Augmented 7th':
                this.notes = this.tone.augmented7thChord();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Augmented Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                break;

            case 'Major Ninth':
                this.notes = this.tone.majorNinthChord();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Major 7th'] = this.notes[3];
                this.intervals['Ninth'] = this.notes[4];
                break;

            case '11th':

                this.notes = this.tone.eleventh();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['Ninth'] = this.notes[4];
                this.intervals['11th'] = this.notes[5];
                break;

            case 'Major 11th':
                this.notes = this.tone.majorEleventh();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Major 7th'] = this.notes[3];
                this.intervals['Ninth'] = this.notes[4];
                this.intervals['11th'] = this.notes[5];
                break;
            
            case 'Minor 11th':
                this.notes = this.tone.minorEleventh();
                this.intervals['Minor 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['Ninth'] = this.notes[4];
                this.intervals['11th'] = this.notes[5];
                break;

            case '13th':
                this.notes = this.tone.thirteenth();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['Ninth'] = this.notes[4];
                this.intervals['13th'] = this.notes[5];
                break;

            case '13th flat 9':
                this.notes = this.tone.thirteenthFlat9();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['Flat 9th'] = this.notes[4];
                this.intervals['13th'] = this.notes[5];
                break;

            case '13th #9':
                this.notes = this.tone.thirteenthSharp9();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['#9'] = this.notes[4];
                this.intervals['13th'] = this.notes[5];
                break;


            case '7th flat 9':

                this.notes = this.tone.dominant7thflat9();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['Flat 9th'] = this.notes[4];
                break;

            case '7th #9':

                this.notes = this.tone.dominant7thSharp9();
                this.intervals['Major 3rd'] = this.notes[1];
                this.intervals['Perfect Fifth'] = this.notes[2];
                this.intervals['Dominant 7th'] = this.notes[3];
                this.intervals['#9'] = this.notes[4];
                break;



        }


    }

    static closedPosition(chord) {
        // helper method for returning the closed position of the chord on keyboard
        // the chord input is an array of the ordered intervals of the chord
        // and should be supplies by the other methods
        if (chord.length === 5){
            chord.splice(0,1)
        }

        if (chord.length === 6){
            chord.splice(0,1)
            chord.splice(1,1)
        }

        return chord
    }

    static makeChords(OBJECT) {

        const tones = Object.keys(Tone.toneList)
        // console.log(tones)
        const chordTypes = ['Major', 'Minor' , 'Augmented' , 'Diminished', 'Dominant 7th', 'Major 7th', 'Minor 7th', 'Half Diminished 7th', 'Diminished 7th', 'Ninth', 'Minor Ninth', 'Sus 4', 'Minor-Major 7th', 'Augmented 7th', 'Major Ninth'];
        for (let i= 0; i < tones.length; i++){
            for (let j = 0; j < chordTypes.length; j++){
                OBJECT[`${tones[i]} ${chordTypes[j]}`] = new Chord(Tone.toneList[tones[i]], chordTypes[j]);
            }
        }

    }
}





