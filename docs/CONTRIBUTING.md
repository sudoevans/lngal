# Contributing to Lightning Network Gallery

Welcome! We're excited that you want to contribute to the Lightning Network Gallery. This guide will help you add or update Lightning Network projects in our visualization.

## Quick Start for Non-Technical Users

### Adding a New Project

1. **Navigate to the data file**: Go to [`lngal_data.json`](../lngal_data.json) in the GitHub repository
2. **Click the pencil icon** (✏️) to edit the file
3. **Find the right category** for your project in the JSON structure
4. **Add your project** following the format below
5. **Submit a pull request** with a clear description

### Project Format

Each project should follow this structure:

```json
{
  "project_name": "Some Project Name",
  "project_level": "Brief description of what type of project this is",
  "links": [
    {
      "type": "Website",
      "url": "https://someproject.com",
      "citation": ""
    },
    {
      "type": "GitHub",
      "url": "https://github.com/someproject/repo",
      "citation": ""
    }
  ],
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Field Descriptions

- **project_name**: The official name of the project
- **project_level**: A brief description of what the project does (e.g., "Mobile Wallet", "Payment Processor", "Node Management Tool")
- **links**: Array of relevant links
  - **type**: Type of link (Website, GitHub, Documentation, etc.)
  - **url**: The actual URL
  - **citation**: Leave empty unless referencing a specific source
- **tags**: Array of relevant tags to help with filtering and discovery

### Categories

Our current categories are:

1. **Lightning Network Implementations** - Full protocol implementations
2. **Standards and Specifications** - Technical standards and documentation
3. **Lightning Service Providers (LSPs) & Infrastructure** - Service providers and infrastructure
4. **Wallets** - User-facing wallet applications
5. **Payment Processors & Merchant Solutions** - Business payment tools
6. **Node Management Tools & Web Interfaces** - Tools for managing Lightning nodes
7. **Network Explorers & Analytics** - Tools for exploring the Lightning network
8. **Gaming Platforms & Applications** - Games and gaming platforms
9. **Content Monetization & Streaming Platforms** - Content creator tools
10. **Emerging Applications & Concepts** - New and experimental applications
11. **Security Tools** - Security-focused tools and services
12. **Community & Educational Resources** - Learning and community resources

## For Technical Contributors

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/okjodom/lngal
   cd lngal
   ```

2. **Make your changes** to `lngal_data.json`

3. **Test locally**:
   - Open `index.html` in your browser
   - Verify your project appears correctly
   - Test search and filtering functionality

4. **Validate JSON**:
   ```bash
   python -m json.tool lngal_data.json
   ```

5. **Commit and push**:
   ```bash
   git add lngal_data.json
   git commit -m "Add [Project Name] to [Category]"
   git push origin your-branch-name
   ```

6. **Create a pull request**

### Data Quality Guidelines

#### Project Selection Criteria
- Project must be related to the Lightning Network
- Project should be actively maintained (or historically significant)
- Avoid duplicate entries
- Include only legitimate, non-scam projects

#### Naming Conventions
- Use the official project name
- Avoid unnecessary abbreviations
- Be consistent with existing entries

#### Link Guidelines
- Verify all URLs are working
- Prefer official websites over third-party descriptions
- Include GitHub repos when available
- Use HTTPS when possible

#### Tag Best Practices
- Use existing tags when possible
- Keep tags concise and relevant
- Common tags include:
  - Technology: `Rust`, `Go`, `JavaScript`, `Python`
  - Type: `Mobile`, `Desktop`, `Web`, `CLI`
  - Features: `Non-Custodial`, `Open Source`, `Enterprise`
  - Platform: `iOS`, `Android`, `Linux`, `Windows`

### JSON Structure

The data file follows this structure:

```json
{
  "categories": [
    {
      "name": "Category Name",
      "description": "Category description",
      "items": [
        {
          "project_name": "Project Name",
          "project_level": "Project Type",
          "links": [...],
          "tags": [...]
        }
      ]
    }
  ]
}
```

## Review Process

### What We Look For

1. **Accuracy**: Information is correct and up-to-date
2. **Relevance**: Project is clearly Lightning Network related
3. **Quality**: Well-maintained projects with good documentation
4. **No Duplicates**: Project isn't already listed
5. **Proper Formatting**: Follows our JSON structure

### Review Timeline

- Most PRs are reviewed within 48 hours
- Simple additions are typically merged quickly
- Complex changes may require additional discussion

## Getting Help

### Questions?

- Open an issue on GitHub
- Check existing issues for similar questions
- Review the [Data Schema documentation](DATA_SCHEMA.md)

### Common Issues

**JSON Validation Errors**: Use [JSONLint](https://jsonlint.com/) to validate your JSON syntax

**Project Categories**: If unsure about categorization, suggest in your PR description

**Duplicate Projects**: Search existing data before adding new entries

## Code of Conduct

- Be respectful and constructive
- Focus on improving the resource for everyone
- Avoid promotional language
- Stick to factual information

## Recognition

Contributors are automatically recognized in our GitHub repository. Thank you for helping make the Lightning Network ecosystem more discoverable!

---

## Example: Adding a Project

Here's a complete example of adding a fictional wallet:

```json
{
  "project_name": "Lightning Swift Wallet",
  "project_level": "Non-Custodial Mobile Wallet",
  "links": [
    {
      "type": "Website",
      "url": "https://lightningswift.com",
      "citation": ""
    },
    {
      "type": "GitHub",
      "url": "https://github.com/lightningswift/wallet",
      "citation": ""
    },
    {
      "type": "App Store",
      "url": "https://apps.apple.com/app/lightning-swift",
      "citation": ""
    }
  ],
  "tags": ["Mobile", "iOS", "Non-Custodial", "Swift", "Open Source"]
}
```

This would be added to the "Wallets" category in the `items` array.
