import { Received, Open, Done, Match, Changed, Activated } from "./full_data.js";

export abstract class FullListener {
    onReceived(msg: Received): void {}
    onOpen(msg: Open): void {} 
    onDone(msg: Done): void {}
    onMatch(msg: Match): void {}
    onChanged(msg: Changed): void {}
    onActivated(msg: Activated): void {}
}

export function fullClient(listener: FullListener): (data: string) => void {
    return function(data: string): void {
        if (data.startsWith('{"type":"re')) {
            listener.onReceived(JSON.parse(data));
        } else if (data.startsWith('{"type":"op')) {
            listener.onOpen(JSON.parse(data));
        } else if (data.startsWith('{"type":"do')) {
            listener.onDone(JSON.parse(data));
        } else if (data.startsWith('{"type":"ma')) {
            listener.onMatch(JSON.parse(data));
        } else if (data.startsWith('{"type":"ch')) {
            listener.onChanged(JSON.parse(data));
        } else if (data.startsWith('{"type":"ac')) {
            listener.onActivated(JSON.parse(data));
        }
    }
}
