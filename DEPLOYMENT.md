# suppliers-auction Deployment Guide (Sandbox/Testnet)

**Version:** 1.0.0

> **⚠️ Important:** This is a **sandbox/testnet-only prototype**.  
> No mainnet deployment or official partnership is claimed.

---

## 🚀 Deploying to Vercel

1. Fork or clone the repository:
   ```bash
   git clone https://github.com/mibo01699/suppliers-auction.git
```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy to Vercel:
   · Connect your GitHub repository to Vercel.
   · Set environment variables (if any).
   · Click "Deploy".

---

💻 Local Development

```bash
npm start
```

Server will run on http://localhost:3000.

---

🧪 Testing

```bash
npm test
```

---

📋 Environment Variables

Create a .env file based on .env.example:

```env
BIGISH_YER_API=http://localhost:3000
NODE_ENV=development
PORT=3000
```

---

🦅 Developed by Arabian Eagle Technology Group (A.E.C.)