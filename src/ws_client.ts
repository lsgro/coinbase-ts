export class WsClient {	
	ws?: WebSocket = undefined;

	url: string;
	products: Array<string>;
	channels: Array<string>;
	onMessage: (msg: MessageEvent<any>) => void;

	constructor(
		url: string,
		products: Array<string>,
		channels: Array<string>,
		onMessage: (msg: MessageEvent<any>) => void
	) {
		this.url = url;
		this.products = products;
		this.channels = channels;
		this.onMessage = onMessage;
	}

	subscribe(): void {
		let json = JSON.stringify({
			"type": "subscribe",
			"product_ids": this.products,
			"channels": this.channels
		});
		this.ws?.send(json);
	}

	unsubscribe(): void {
		let json = JSON.stringify({
			"type": "unsubscribe",
			"channels": this.channels
		});
		this.ws?.send(json);
	}

	open(): void {
		this.ws = new WebSocket(this.url);
		this.ws.addEventListener('open', (event) => this.subscribe());
		this.ws.addEventListener('message', this.onMessage);
	}

	close(): void {
		this.ws?.close();
	}
}
