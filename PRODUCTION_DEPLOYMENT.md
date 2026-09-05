# Production Deployment Architecture & Step-by-Step Guide
## Scaled for up to 100,000 Users (100% Free Hosting Stack)

This platform is configured for production deployment across industry-leading cloud providers that offer free tiers capable of serving **100,000+ monthly active users** when combined with Global Edge CDNs and connection pooling.

---

### 1. Free Production Infrastructure Stack

| Component | Recommended Free Provider | Free Tier Specification | Scalability Mechanism |
| :--- | :--- | :--- | :--- |
| **Domain & Subdomains** | **Cloudflare DNS** (Free) | Free SSL certificates, DDoS mitigation, Edge Web Application Firewall (WAF) | Caching static assets at 300+ global edge locations |
| **Frontend** | **Vercel** / **Cloudflare Pages** | Unlimited custom domains & subdomains (`xyz.com`, `admin.xyz.com`), 100 GB Bandwidth | Edge SSR & Static Generation (renders in < 50ms) |
| **Backend REST API** | **Render.com** / **Railway** / **Koyeb** | 750 free instance hours / month, automatic SSL, HTTP/2 | Stateless Express API with MongoDB connection pooling |
| **Database** | **MongoDB Atlas (M0 Free Cluster)** | 512 MB storage, shared RAM, replica set reliability | Compound index queries (`exam`, `subject`, `status`) and query projection |

---

### 2. Step 1: Deploy Backend to Render.com (Free)

1. Create a free account on **[render.com](https://render.com)**.
2. Push your project to GitHub or connect directly.
3. Click **New +** $\rightarrow$ **Web Service**.
4. Configure the Web Service:
   - **Name**: `bpsc-tre-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free`
5. Set Environment Variables in Render Dashboard:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/bpsc_stet_prod?retryWrites=true&w=majority`
   - `JWT_SECRET`: *(Generate a 32+ character random string)*
   - `COOKIE_SECRET`: *(Generate a 32+ character random string)*
   - `CLIENT_URL`: `https://xyz.com,https://admin.xyz.com`
6. Render gives you an API URL, e.g.: `https://bpsc-tre-backend.onrender.com`.

---

### 3. Step 2: Deploy Frontend to Vercel (Free)

1. Create a free account on **[vercel.com](https://vercel.com)**.
2. Click **Add New...** $\rightarrow$ **Project** $\rightarrow$ Import your Git repository.
3. Select the **`frontend`** directory as the root.
4. Set Environment Variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: `https://bpsc-tre-backend.onrender.com/api/v1`
   - `NEXT_PUBLIC_SITE_URL`: `https://xyz.com`
5. Click **Deploy**. Vercel will build and deploy the Next.js application in ~60 seconds.

---

### 4. Step 3: Configure Custom Domains & Subdomains (Vercel & Cloudflare)

In Vercel **Project Settings** $\rightarrow$ **Domains**:
1. Add **`xyz.com`** (For students & normal users).
2. Add **`www.xyz.com`** (Redirects to `xyz.com`).
3. Add **`admin.xyz.com`** (For administrative panel).

In your Domain Registrar / Cloudflare DNS Management:
- Add a `CNAME` record:
  - **Name**: `@`
  - **Target**: `cname.vercel-dns.com`
  - **Proxy**: Enabled (Orange Cloud)
- Add a `CNAME` record for admin:
  - **Name**: `admin`
  - **Target**: `cname.vercel-dns.com`
  - **Proxy**: Enabled (Orange Cloud)

Our Next.js **Edge Middleware (`src/middleware.ts`)** and **Admin Layout Guard (`src/app/admin/layout.tsx`)** will automatically route visitors to the appropriate portal:
- `admin.xyz.com` $\rightarrow$ Direct to Admin Control Center with strict RBAC security.
- `xyz.com` $\rightarrow$ Direct to Student Examination & Dashboard experience.
- Unauthorized students attempting to visit `/admin` will receive an immediate **403 Access Denied** block.

---

### 5. How 100,000 Users Are Handled Free:
1. **Edge CDN Caching**: Static questions, mock test metadata, and syllabus pages are cached globally on Cloudflare/Vercel Edge, consuming 0 backend server resources.
2. **MongoDB Connection Pool**: Configured with `maxPoolSize: 50` and indexed queries to prevent database bottlenecks.
3. **Optimized Payloads**: Lean JSON responses ensure low bandwidth consumption.
