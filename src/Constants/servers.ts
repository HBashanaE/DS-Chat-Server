import _ from "lodash";
import { Server, ServerInterface } from "../Interfaces/ServerInterface"
import { getServerId } from "../Utils/utils";
const config = require('config');
const servers = config("servers");

export class ServerList {
    private serverList: ServerInterface = servers;

    getServerIds(): string[] {
        return _.keys(this.serverList)
    }

    getServer(serverid: string): Server {
        return this.serverList[parseInt(serverid)];
    }

    getHigherUpServers(): Server[] {
        const higherUpServers = []
        for (let key in this.serverList) {
            if (parseInt(key) < parseInt(getServerId())) {
                higherUpServers.push(this.serverList[key])
            }
        }
        return higherUpServers
    }

    getMajorityCount(): number {
        const serverCount = _.keys(this.serverList).length
        return Math.floor(serverCount / 2) + 1
    }

}
