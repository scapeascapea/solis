import type { VercelRequest, VercelResponse } from '@vercel/node';

const JUPITER_QUOTE_API = 'https://quote-api.jup.ag/v6';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS from your site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action } = req.query;

  try {
    if (action === 'quote' && req.method === 'GET') {
      // Proxy the quote request
      const { inputMint, outputMint, amount, slippageBps } = req.query;
      
      const url = `${JUPITER_QUOTE_API}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps || 50}&platformFeeBps=80`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      return res.status(200).json(data);
    }

    if (action === 'swap' && req.method === 'POST') {
      // Proxy the swap request with your fee account
      const body = req.body;
      
      // Add your fee account to the swap request
      const swapBody = {
        ...body,
        platformFeeBps: 80, // 0.8% fee
        feeAccount: "AsQ8KE5dYc4DmyCqEezGGRMu7fz4H9vmAe7dX7HAMyum",
        wrapAndUnwrapSol: true,
        computeUnitPriceMicroLamports: 'auto',
      };

      const response = await fetch(`${JUPITER_QUOTE_API}/swap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swapBody),
      });
      
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Jupiter proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
