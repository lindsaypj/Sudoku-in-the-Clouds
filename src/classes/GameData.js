export class GameData {
    constructor() {
        this.testing = {
            numBoards: null,
            boardSize: null,
            hideNums: null,
            boards: {
                board4: null,
                board9: null,
                board16: null
            }
        };

        this.casual = {
            saveStates: {
                board4: null,
                board9: null,
                board16: null
            },
            initStates: {
                board4: null,
                board9: null,
                board16: null
            }
        };
    }
}