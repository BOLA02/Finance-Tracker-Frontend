# Finance Tracker

A modern, full-stack financial management application with a beautiful React frontend and Flask backend. Track your income and expenses in real-time with an intuitive, professional UI.

## Features

**Core Functionality**
-  **Add Transactions** - Easily add income and expense transactions
-  **Real-time Analytics** - View your total balance, income, and expenses at a glance
-  **Filter Transactions** - Toggle between viewing all transactions, income only, or expenses only
-  **Delete Transactions** - Remove transactions from your history
-  **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

 **Design**
- Modern dark-themed interface with gradient accents
- Intuitive stats cards displaying financial metrics
- Smooth animations and transitions
- Professional color scheme with high contrast for readability
- Clean, organized layout with proper visual hierarchy

## Tech Stack

### Frontend
- **Next.js 16** - React framework with server components and API routes
- **React 19.2** - UI library with hooks and functional components
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Hook Form** - Efficient form management
- **date-fns** - Date manipulation library
- **Lucide React** - Beautiful icon set
- **Sonner** - Toast notifications

### Backend
- **Flask** - Python web framework
- **REST API** - Communicates via HTTP endpoints

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for the backend)

### Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd finance-tracker
   \`\`\`

2. **Install frontend dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:5000
   \`\`\`
   
   - `NEXT_PUBLIC_API_URL` - URL of your Flask backend (defaults to `http://localhost:5000`)

## Running the Application

### Development Mode

1. **Start the Flask backend** (in a separate terminal)
   \`\`\`bash
   python app.py
   \`\`\`
   The backend will run on `http://localhost:5000`

2. **Start the Next.js development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The frontend will be available at `http://localhost:3000`

### Production Build

\`\`\`bash
npm run build
npm run start
\`\`\`

## Backend API Endpoints

The application expects the following Flask endpoints:

### Get All Transactions
\`\`\`
GET /api/transactions
Response: { "transactions": [...] }
\`\`\`

### Add New Transaction
\`\`\`
POST /api/transactions
Body: { "type": "income|expense", "amount": number, "description": string, "date": string }
Response: { "id": number, "type": string, "amount": number, "description": string, "date": string }
\`\`\`

### Delete Transaction
\`\`\`
DELETE /api/transactions/{id}
Response: { "message": "Transaction deleted" }
\`\`\`

## Project Structure

\`\`\`
finance-tracker/
├── app/
│   ├── page.jsx              # Main page component
│   ├── layout.jsx            # Root layout with metadata
│   └── globals.css           # Global styles and design tokens
├── components/
│   ├── dashboard.jsx         # Main dashboard component
│   ├── transaction-form.jsx  # Form to add transactions
│   ├── transaction-list.jsx  # List of transactions
│   ├── transaction-item.jsx  # Individual transaction item
│   ├── stats-cards.jsx       # Financial stats display
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── api.js                # API client functions
│   └── utils.js              # Utility functions
├── public/                   # Static assets
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
\`\`\`

## Troubleshooting

### "Failed to fetch" Error
- **Issue**: The backend is not running or the API URL is incorrect
- **Solution**: 
  1. Ensure your Flask backend is running on the correct port
  2. Check that `NEXT_PUBLIC_API_URL` is set correctly in `.env.local`
  3. Verify CORS is enabled on your Flask backend

### Transactions Not Appearing
- **Issue**: Backend is running but transactions aren't loading
- **Solution**:
  1. Open browser DevTools (F12) → Network tab
  2. Check if the API requests are successful (status 200)
  3. Verify your database/backend data storage is working

### Port Already in Use
- **Issue**: Port 3000 or 5000 is already in use
- **Solution**: 
  \`\`\`bash
  # Change the development port
  npm run dev -- -p 3001
  \`\`\`

## API Response Examples

### Add Transaction
\`\`\`json
{
  "id": 1,
  "type": "income",
  "amount": 5000,
  "description": "Monthly Salary",
  "date": "2024-12-11"
}
\`\`\`

### Get Transactions
\`\`\`json
{
  "transactions": [
    {
      "id": 1,
      "type": "income",
      "amount": 5000,
      "description": "Monthly Salary",
      "date": "2024-12-11"
    },
    {
      "id": 2,
      "type": "expense",
      "amount": 150,
      "description": "Groceries",
      "date": "2024-12-10"
    }
  ]
}
\`\`\`



## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the backend API documentation
3. Check browser console for error messages
4. Ensure both frontend and backend are running

---

