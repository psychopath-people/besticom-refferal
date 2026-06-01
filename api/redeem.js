const N8N_REDEEM_URL = "https://n8n.autoinovasoftsolution.cloud/webhook/besti-redeem-v2";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  console.log("[redeem] body:", JSON.stringify(req.body));

  try {
    const upstream = await fetch(N8N_REDEEM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();
    console.log("[redeem] n8n status:", upstream.status, "body:", text.slice(0, 500));

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        success: false,
        message: `n8n response error (HTTP ${upstream.status}): ${text.slice(0, 200)}`,
      });
    }

    return res.status(upstream.status).json(data);
  } catch (err) {
    console.error("[redeem] fetch error:", err);
    return res.status(502).json({ success: false, message: `Proxy error: ${String(err)}` });
  }
}
