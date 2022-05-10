import { SecretNetworkClient } from "secretjs";

const secretjs = await SecretNetworkClient.create({
    chainId: "secretdev-1",
    grpcWebUrl: "http://localhost:9091",
});