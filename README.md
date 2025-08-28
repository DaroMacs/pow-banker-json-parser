# JSON Date Updater

This tool is specifically designed for updating test configuration files where you need to set consistent start, end, and forward dates across multiple test items with POW Banker EA.

## Features

- **File Upload**: Drag and drop or click to upload JSON files
- **Live Preview**: See changes before downloading the updated file
- **Bulk Date Updates**: Automatically updates `Start Date`, `End Date`, and `Forward Date` fields
- **Smart Filtering**: Preserves `global_settings` objects without modification
- **Download**: Export the updated JSON with a descriptive filename
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Shadcn UI and Tailwind CSS for a clean, professional interface

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pow-banker-json-parser
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Upload JSON File**: Click the "Upload JSON" button and select your JSON file
2. **Set Date**: Choose the date you want to apply to all test items
3. **Preview Changes**: Click "Preview changes" to see how your JSON will look
4. **Download**: Click "Download updated JSON" to save the modified file

## How It Works

The tool processes JSON files containing test configuration data and:

- **Preserves Structure**: Maintains the original JSON structure and formatting
- **Updates Date Fields**: Sets `Start Date`, `End Date`, and `Forward Date` to your specified date
- **Skips Global Settings**: Leaves `global_settings` objects unchanged
- **Handles Arrays**: Works with both single objects and arrays of objects

### Example Transformation

**Input JSON:**

```json
[
  {
    "Test Name": "test_1",
    "Start Date": "2024-01-01",
    "End Date": "2024-01-01",
    "Forward Date": "2024-01-01"
  },
  {
    "Test Name": "global_settings",
    "config": "value"
  }
]
```

**After setting date to "2024-12-25":**

```json
[
  {
    "Test Name": "test_1",
    "Start Date": "2024-12-25",
    "End Date": "2024-12-25",
    "Forward Date": "2024-12-25"
  },
  {
    "Test Name": "global_settings",
    "config": "value"
  }
]
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── Home/           # Main application component
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
│   ├── useFileUpload.ts    # File upload logic
│   └── useJsonPreview.ts   # JSON preview logic
├── lib/                # Utility functions
│   └── updateDates.ts      # Core date update logic
└── utils/              # Helper utilities
    └── fileUtils.ts        # File download utilities
```
