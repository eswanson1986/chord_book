class Tone {
    constructor(root,min2nd,maj2nd,min3rd,maj3rd,p4th,tritone,p5th,min6th,maj6th, dim7th, dom7th,maj7th,octave,sharp9th) {
        this.root    = root;
        this.min2nd  = min2nd;
        this.maj2nd  = maj2nd;
        this.min3rd  = min3rd;
        this.maj3rd  = maj3rd;
        this.p4th    = p4th;
        this.tritone = tritone;
        this.p5th    = p5th[0];
        this.min6th  = min6th;
        this.maj6th  = maj6th;
        this.dim7th  = dim7th;
        this.dom7th  = dom7th;
        this.maj7th  = maj7th;
        this.octave  = octave;
        this.sharp9th = sharp9th;

        this.dim5th = p5th[1];
        this.aug5th = p5th[2];
    }

    minorChord() {
        return [this.root, this.min3rd, this.p5th];
    }

    majorChord() {
        return [this.root, this.maj3rd, this.p5th];
    }

    diminishedChord() {
        return [this.root, this.min3rd, this.dim5th];
    }

    augmentedChord() {
        return [this.root, this.maj3rd, this.aug5th];
    }

    suspended2ndChord(){
        return [this.root, this.maj2nd, this.p5th];
    }

    suspended4thChord(){
        return [this.root, this.p4th, this.p5th];
    }

    dominant7thChord () {
        let chord = this.majorChord();
        chord.push(this.dom7th);
        return chord
    }

    major7thChord() {
        let chord = this.majorChord();
        chord.push(this.maj7th);
        return chord;
    }

    minor7thChord() {
        let chord = this.minorChord();
        chord.push(this.dom7th);
        return chord;
    }

    halfDiminished7thChord(){
        let chord = this.diminishedChord();
        chord.push(this.dom7th);
        return chord;
    }

    diminished7thChord(){
        let chord = this.diminishedChord();
        chord.push(this.dim7th);
        return chord;
    }

    ninthChord(){
        let chord = this.dominant7thChord();
        chord.push(this.maj2nd);
        return chord
    }

    minorNinthChord(){
        let chord = this.minor7thChord();
        chord.push(this.maj2nd);
        return chord;
    }

    minorMajor7th() {
        let chord = this.minorChord();
        chord.push(this.maj7th)
        return chord;
    }

    augmented7thChord() {
        let chord = this.augmentedChord();
        chord.push(this.dom7th);
        return chord;
    }

    majorNinthChord() {
        let chord = this.major7thChord();
        chord.push(this.maj2nd);
        return chord;
    }

    eleventh() {
        let chord = this.ninthChord();
        chord.push(this.p4th)
        return chord;
    }

    majorEleventh() {
        let chord = this.majorNinthChord();
        chord.push(this.p4th)
        return chord;
    }

    minorEleventh() {
        let chord = this.minorNinthChord();
        chord.push(this.p4th)
        return chord;
    }

    thirteenth() {
        let chord = this.ninthChord()
        chord.push(this.maj6th)
        return chord;
    }

    dominant7thflat9(){
        let chord = this.dominant7thChord();
        chord.push(this.min2nd);
        return chord
    }

    dominant7thSharp9(){
        let chord = this.dominant7thChord();
        chord.push(this.sharp9th);
        return chord
    }

    thirteenthFlat9() {
        let chord = this.dominant7thflat9()
        chord.push(this.maj6th)
        return chord;
    }

    thirteenthSharp9() {
        let chord = this.dominant7thSharp9()
        chord.push(this.maj6th)
        return chord;
    }


    /////////////////////////////////////////////////////////////////////////////////////

    static toneList = {

    'Cb'     : new Tone('Cb','Dbb','Db','Ebb','Eb','Fb','F',['Gb','Gbb','G'],'Abb','Ab', 'Bbbb','Bbb','Bb','Cb','D'),
    'C'      : new Tone('C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', ['G', 'Gb', 'G#'], 'Ab', 'A','Bbb', 'Bb', 'B', 'C','D#'),
    'C#'     : new Tone('C#', 'D', 'D#', 'E', 'E#', 'F#', 'F##', ['G#', 'G', 'G##'], 'A', 'A#','Bb', 'B', 'B#', 'C#','D##'),

    'Db'     : new Tone('Db', 'Ebb', 'Eb', 'Fb', 'F', 'Gb', 'G', ['Ab', 'Abb', 'A'], 'Bbb', 'Bb','Cbb', 'Cb', 'C', 'Db','E'),
    'D'      : new Tone('D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', ['A', 'Ab', 'A#'], 'Bb', 'B','Cb', 'C', 'C#', 'D','E#'),
    'D#'     : new Tone('D#','E','E#','F#', 'F##', 'G#', 'G##',['A#','A','A##'],'B','B#','C', 'C#','C##','D','E##'),

    'Eb'     : new Tone('Eb','Fb','F','Gb','G','Ab','A', ['Bb', 'Bbb','B'],'Cb', 'C','Dbb', 'Db', 'D','Eb','F#'),
    'E'      : new Tone('E','F','F#','G','G#','A','A#', ['B','Bb','B#'],'C','C#','Db', 'D', 'D#', 'E','F##'),
    'E#'     : new Tone('E#','F#','F##','G#','G##','A#', 'A##', ['B#', 'B', 'B##'], 'C#', 'C##','D', 'D#', 'D##', 'E#','F###'),

    'Fb'     : new Tone('Fb','Gbb', 'Gb', 'Abb', 'Ab', 'Bbb', 'Bb', ['Cb', 'Cbb', 'C'], 'Dbb', 'Db','Ebbb', 'Ebb', 'Eb','Fb','G'),
    'F'      : new Tone('F','Gb','G','Ab', 'A', 'Bb', 'B', ['C','Cb','C#'], 'Db','D','Ebb', 'Eb', 'E','F','G#'),
    'F#'     : new Tone('F#','G', 'G#','A','A#','B','B#',['C#','C', 'C##'],'D','D#','Eb', 'E','E#','F#','G##'),

    'Gb'     : new Tone('Gb','Abb','Ab','Bbb','Bb','Cb','C',['Db','Dbb','D'],'Ebb','Eb','Fbb','Fb','F','Gb','A'),
    'G'      : new Tone('G', 'Ab','A','Bb','B','C','C#',['D','Db','D#'],'Eb','E','Fb', 'F','F#','G','A#'),
    'G#'     : new Tone('G#','A','A#', 'B','B#','C#','C##',['D#','D','D##'],'E','E#','F', 'F#','F##','G#','A##'),

    'Ab'     : new Tone('Ab','Bbb','Bb','Cb','C','Db','D',['Eb','Ebb','E'],'Fb','F','Gbb', 'Gb','G','Ab','B'),
    'A'      : new Tone('A','Bb','B','C','C#','D','D#',['E','Eb','E#'],'F','F#','Gb', 'G','G#','A','B#'),
    'A#'     : new Tone('A#', 'B', 'B#', 'C#', 'C##', 'D#', 'D##', ['E#', 'E', 'E##'], 'F#', 'F##','G', 'G#', 'G##', 'A#','B##'),

    'Bb'     : new Tone('Bb', 'Cb', 'C', 'Db', 'D', 'Eb', 'E', ['F', 'Fb', 'F#'], 'Gb', 'G','Abb', 'Ab', 'A', 'Bb','C#'),
    'B'      : new Tone('B', 'C', 'C#', 'D', 'D#', 'E', 'E#', ['F#', 'F', 'F##'], 'G', 'G#', 'Ab', 'A', 'A#', 'B','C##'),
    'B#'     : new Tone('B#', 'C#', 'C##', 'D#', 'D##', 'E#', 'E##', ['F##', 'F#', 'F###'], 'G#','G##','A', 'A#','A##','B#','C###'),
    }
}













