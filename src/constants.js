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
        this.obsRespawnInterval = 1300;
        this.coinRespawnInterval = 2600;
        this.storeRespawnInterval = 7800;
        this.coinCntInterval =128;

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