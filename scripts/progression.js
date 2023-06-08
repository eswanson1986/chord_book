class Progression {
    constructor(tonic, numerals=[]){
        this.tonic = tonic
        this.numerals = numerals
        this.chordProgression = []


        for (let i =0; i < this.numerals.length; i++) {

            let rootNote;
            let chordType;

            let rootNoteSwitch = this.numerals[i].split('_')[0]
            switch (rootNoteSwitch) {

                case ('i') :
                    rootNote = this.tonic.root
                    break;

                case ('I') :
                    rootNote = this.tonic.root
                    break;

                case ('ii') :
                    rootNote = this.tonic.maj2nd;


                    break;
                case ('II') :
                    rootNote = this.tonic.maj2nd;


                    break;
                case ('iii') :
                    rootNote = this.tonic.maj3rd;
                    break;

                case ('III') :
                    rootNote = this.tonic.maj3rd;
                    break;

                case ('iv') :
                    rootNote = this.tonic.p4th;
                    break;

                case ('IV') :
                    rootNote = this.tonic.p4th;

                    break;
                case ('v') :
                    rootNote = this.tonic.p5th;

                    break;
                case ('V') :
                    rootNote = this.tonic.p5th;
                    break;

                case ('vi') :
                    rootNote = this.tonic.maj6th;

                    break;
                case ('VI') :
                    rootNote = this.tonic.maj6th;

                    break;
                case ('vii') :
                    rootNote = this.tonic.maj7th;

                    break;
                case ('VII') :
                    rootNote = this.tonic.maj7th;
                    break;

                default :

                    this.chordProgression = false
                    return


            }



            let majorMinorSwitch = this.numerals[i].split('_')[0]

            if (majorMinorSwitch === majorMinorSwitch.toUpperCase()) {
                chordType = 'Major'
            }
            else {
                chordType = 'Minor'
            }

            let chordTypeSwitch = this.numerals[i].split('_')[1]

            switch (chordTypeSwitch) {

                case (undefined) :
                    break;

                case('-') :
                    chordType = 'Diminished'
                    break;

                case ('7') :
                    if (chordType === 'Minor') {
                        chordType += ' 7th'
                        break;
                    }
                    else {
                        chordType = '7th'
                        break;
                    }

                case ('-7') : {
                    chordType = 'Diminished 7th'
                    break;
                }

                case ('+') : {
                    chordType = 'Augmented'
                    break;
                }

                case ('maj7') : {
                    chordType = 'Major 7th'
                    break;
                }

                case('o7') : {
                    chordType = 'Half Diminished 7th'
                    break;
                }

                case ('9') : {
                    if (chordType === 'Minor'){
                        chordType += ' Ninth'
                        break;
                    }
                    else {
                        chordType = 'Ninth'
                        break;
                    }
                }

                case('maj9') : {
                    chordType = 'Major Ninth'
                    break;
                }

                case('sus2') : {
                    chordType = 'Sus 2'
                    break;
                }

                case('sus4') : {
                    chordType = 'Sus 4'
                    break;
                }

                case('min-maj7') : {
                    chordType = 'Minor-Major 7th'
                    break;

                }

                case('+7') : {
                    chordType = 'Augmented 7th'
                    break;
                }

                case('11') : {
                    if (chordType === 'Minor') {
                        chordType += ' 11th';
                        break;
                    } else {
                        chordType = '11th'
                        break;
                    }
                }

                case ('maj11') : {
                    chordType = 'Major 11th'
                    break;
                }

                case ('13') : {
                    chordType = '13th'
                    break;

                }

                case ('13b9') : {
                    chordType = '13th flat 9'
                    break;

                }

                case ('13#9') : {
                    chordType = '13th #9'
                    break;

                }
                case ('7b9') : {
                    chordType = '7th flat 9'
                    break;

                }
                case ('7#9') : {
                    chordType = '7th #9'
                    break;

                }

                default:

                    this.chordProgression = false
                    return
            }

            this.chordProgression.push(new Chord(Tone.toneList[`${rootNote}`],`${chordType}`))
        }
    }

}

