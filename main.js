const display = new Display('Chord Book')


let loadSongBookData = async () => {
    await ChordBook.loadData()
    display.mainScreen('mainScreen')
}

loadSongBookData()




