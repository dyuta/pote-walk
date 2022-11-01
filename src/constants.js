class Constants{

    constructor(){
        this.name = "constObj";
        this.appURL = 'https://dyuta.github.io/pote-walk/';
        this.numberOfStores=6;

        this.volumeBGM=0.1;
        this.volumeSound=0.2;
        
        this.START_GAME="START_GAME";
        this.GO_CREDIT="GO_CREDIT";
        this.GO_TITLE="GO_TITLE";
        this.VOLUME_OFF="VOLUME_OFF";
        this.VOLUME_ON="VOLUME_ON";
        this.GO_POTATO="GO_POTATO";

        this.colors = {
            bg:"E7E6E3"
        };

        this.jumpVelocity = -1250;

        this.gameSpeedNormal = 10;
        this.gameSpeedFast = 12;

        this.obsRespawnInterval = 1100;
        this.coinRespawnInterval = 2200;
        this.storeRespawnInterval = 5500;
        this.coinCntInterval =128;

        this.distances={
            obstacleFrom:400,
            obstacleTo:700,
            coinFromFirst:100,
            coinToFirst:350,
            coinFromSec:850,
            coinToSec:950,
            bookstore:400,
            potehome:500
        };

        this.worldScroll = 0.6;

        this.fontoConf = {};
        this.fontoConf.counter = {
			fontFamily: '"Roboto"', fontSize: '28px', fill: "#878176"
        };
        this.fontoConf.resultTitle = {
			fontFamily: '"Concert One"', fontSize: '40px', fill: "#EFA92A"
        };
        this.fontoConf.resultDetail = {
			fontFamily: '"Concert One"', fontSize: '32px', fill: "#EFA92A"
        };

    }
}

export default Constants;