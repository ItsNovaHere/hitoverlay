const ui = {
    var : fadeTime = parseInt(new URLSearchParams(window.location.search).get("fadeTime") || "500"),
    onGameConnected(data){
        console.log("Connected to Beat Saber v" + data.game.gameVersion);
    },
    noteCut(data, fullStatus){
        let bloq = document.createElement("img");
        let hitLine = document.createElement("img");

        if(document.getElementsByClassName(`HitLine Layer${fullStatus.noteCut.noteLayer} Line${fullStatus.noteCut.noteLine}`)[0]){
            ui.deleteNote(document.getElementsByClassName(`HitLine Layer${fullStatus.noteCut.noteLayer} Line${fullStatus.noteCut.noteLine}`)[0]);
        }

        if(fullStatus.noteCut.cutDirectionDeviation < -15 || fullStatus.noteCut.cutDirectionDeviation > 15) {
            hitLine.src = "hit.png";
        } else {
            hitLine.src = "hitbad.png";
        }

        hitLine.classList.add("HitLine");
        hitLine.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        hitLine.classList.add(`Line${fullStatus.noteCut.noteLine}`);

        if(fullStatus.noteCut.noteCutDirection == "Any"){
            switch(fullStatus.noteCut.saberType){
                case "SaberA":
                    bloq.src = "bloqdb.png";
                    break;
                case "SaberB":
                    bloq.src = "bloqda.png";
                    break;
            }

            hitLine.style.setProperty("display", "none");
        } else {
            switch(fullStatus.noteCut.saberType){
                case "SaberA":
                    bloq.src = "bloqb.png";
                    break;
                case "SaberB":
                    bloq.src = "bloqa.png";
                    break;
            }
        }

        bloq.classList.add("Note");
        bloq.classList.add(`Layer${fullStatus.noteCut.noteLayer}`);
        bloq.classList.add(`Line${fullStatus.noteCut.noteLine}`);
        bloq.classList.add(fullStatus.noteCut.noteCutDirection);
        bloq.style.setProperty("--fadeTime",  `${fadeTime}ms`);

        document.body.appendChild(bloq);
        document.body.appendChild(hitLine);

        hitLine.style.setProperty("transform", `rotate(${-fullStatus.noteCut.cutDirectionDeviation + ui.getDirectionValue(fullStatus.noteCut.noteCutDirection)}deg)`);
        hitLine.style.setProperty("--fadeTime", `${fadeTime + 100}ms`);

        //ui.applyBlockPosition(fullStatus.noteCut, hitLine);

        console.log(`${fadeTime + 100}ms`);
        setTimeout(function(){ui.deleteNote(bloq, hitLine);}, fadeTime);
    },
    deleteNote(note, line){
        document.body.removeChild(note);
        if(line) setTimeout(function(){document.body.removeChild(line);}, 100);
    },

    getDirectionValue(direction){
        switch(direction){
            case "Up": return 0;
            case "UpRight": return 45;
            case "Right": return 90;
            case "DownRight": return 135;
            case "Down": return 180;
            case "DownLeft": return 225;
            case "Left" : return 270;
            case "UpLeft": return 315;
        }
    },

    applyBlockPosition(data, block){
        switch(data.noteCutDirection){
            case "Up":
                block.style.setProperty("left", `${((data.noteLine + 1) * 105) + (data.cutPoint[0] * 50)}px`);
                console.log(`${(data.noteLine * 100) + (data.cutPoint[0] * 25)}px`);
                break;
            case "UpRight": break;
            case "Right": break;
            case "DownRight": break;
            case "Down":
                block.style.setProperty("left", `${((data.noteLine + 1) * 105) + (data.cutPoint[0] * 50)}px`);
                break;
            case "DownLeft": break;
            case "Left" : break;
            case "UpLeft": break;
        }
    }
}
