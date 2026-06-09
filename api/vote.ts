import { keccak256, toBytes, encodeFunctionData, type Hex, type Address } from "viem";
import { applyCors, authenticate, readJson, sendJson, type Req, type Res } from "./_lib/http.ts";
import { initSchema, getUser } from "./_lib/db.ts";
import { sendSponsored } from "./_lib/aa.ts";
import { publicClient } from "./_lib/chain.ts";

const VOTES_ADDRESS = (process.env.BLITZ_VOTES_ADDRESS || "0x30d47E1986f2Ec086604d96f5D44a30a83A4CCE3") as Address;

const VOTES_ABI = [
  {
    type: "function", name: "vote", stateMutability: "nonpayable",
    inputs: [{ name: "entity", type: "bytes32" }], outputs: [],
  },
  {
    type: "function", name: "getVotes", stateMutability: "view",
    inputs: [{ name: "entities", type: "bytes32[]" }],
    outputs: [{ type: "uint256[]" }],
  },
] as const;

function entityHash(name: string): Hex {
  return keccak256(toBytes(name.toLowerCase()));
}

export default async function handler(req: Req, res: Res) {
  if (req.method === "OPTIONS") { applyCors(res); return sendJson(res, 200, {}); }
  applyCors(res);

  const auth = authenticate(req);
  if (!auth) return sendJson(res, 401, { error: "unauthorized" });
  await initSchema();
  const user = await getUser(auth.user.id);
  if (!user) return sendJson(res, 403, { error: "not_registered" });

  if (req.method === "GET") {
    const names = (req.query?.entities as string || "").split(",").filter(Boolean);
    if (!names.length) return sendJson(res, 400, { error: "missing_entities" });

    const hashes = names.map(n => entityHash(decodeURIComponent(n)));
    const results = await publicClient.readContract({
      address: VOTES_ADDRESS,
      abi: VOTES_ABI,
      functionName: "getVotes",
      args: [hashes],
    }) as bigint[];

    const out: Record<string, number> = {};
    names.forEach((n, i) => { out[decodeURIComponent(n)] = Number(results[i]); });
    return sendJson(res, 200, { votes: out });
  }

  if (req.method === "POST") {
    const body = await readJson<{ entity?: string }>(req);
    const name = body?.entity;
    if (!name) return sendJson(res, 400, { error: "missing_entity" });

    const hash = entityHash(name);
    try {
      const receipt = await sendSponsored(auth.user.id, [{
        to: VOTES_ADDRESS,
        data: encodeFunctionData({ abi: VOTES_ABI, functionName: "vote", args: [hash] }),
      }]);
      return sendJson(res, 200, { txHash: receipt.txHash });
    } catch (e) {
      return sendJson(res, 502, { error: "chain_error", message: (e as Error).message });
    }
  }

  return sendJson(res, 405, { error: "method_not_allowed" });
}
