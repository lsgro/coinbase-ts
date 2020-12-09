import { WsClient } from './ws_client.js';
import { Received } from './full_data.js';
import { FullListener, fullClient } from './full_client.js';

const MAX_MESSAGES = 10;
let totMessages = 0;
let wsc: WsClient;

const PROD_URL = "wss://ws-feed-public.sandbox.pro.coinbase.com";
const TEST_URL = "wss://ws-feed-public.sandbox.pro.coinbase.com";

class MyListener extends FullListener {
    onReceived(msg: Received): void {
        console.debug(msg);
    }
}
let listener = new MyListener();
let onData = fullClient(listener);

function onMessage(event: MessageEvent<any>) {
    console.debug(event.data);
    totMessages++;
    if (totMessages == MAX_MESSAGES) {
	    wsc.unsubscribe();
    }
    onData(event.data);
}

wsc = new WsClient(PROD_URL, ["BTC-USD"], ["full"], onMessage);
wsc.open();

document.body.innerHTML = "Open javascript console!";
