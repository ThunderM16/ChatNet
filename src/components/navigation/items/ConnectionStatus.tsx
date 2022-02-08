import { Text } from "preact-i18n";
import { useContext } from "preact/hooks";

import {
    ClientStatus,
    StatusContext,
} from "../../../context/revoltjs/RevoltClient";

import Banner from "../../ui/Banner";

export default function ConnectionStatus() {
    const status = useContext(StatusContext);

    if (status === ClientStatus.OFFLINE) {
        return (
            <Banner>
                <Text id="app.special.status.offline" />
            </Banner>
        );
    } else if (status === ClientStatus.DISCONNECTED) {
        return (
            <Banner>
                <Text id="app.special.status.disconnected" />
            </Banner>
        );
    } else if (status === ClientStatus.CONNECTING) {
        return (
            <Banner>
                <Text id="app.special.status.connecting" />
            </Banner>
        );
    } else if (status === ClientStatus.RECONNECTING) {
        return (
            <Banner>
                <Text id="app.special.status.reconnecting" />
            </Banner>
        );
    }
    return null;
}
