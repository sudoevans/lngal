# Lightning Network Gallery - Data Schema Documentation

This document describes the structure and requirements for the `lngal_data.json` file.

## Schema Overview

The JSON file contains a single root object with a `categories` array. Each category contains multiple project items.

```json
{
  "categories": [
    {
      "name": "string",
      "description": "string", 
      "items": [...]
    }
  ]
}
```

## Root Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `categories` | Array | ✅ | Array of category objects |

## Category Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Category display name |
| `description` | String | ✅ | Brief description of the category |
| `items` | Array | ✅ | Array of project objects in this category |

### Example Category

```json
{
  "name": "Wallets",
  "description": "User-facing applications designed to facilitate instant and low-cost transactions over the Lightning Network.",
  "items": [...]
}
```

## Project Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `project_name` | String | ✅ | Official project name |
| `project_level` | String | ✅ | Brief description of project type |
| `links` | Array | ✅ | Array of link objects (can be empty) |
| `tags` | Array | ✅ | Array of tag strings (can be empty) |

### Example Project

```json
{
  "project_name": "Lightning Network Daemon (LND)",
  "project_level": "Protocol Implementation (Full Node)",
  "links": [
    {
      "type": "GitHub",
      "url": "https://github.com/lightningnetwork/lnd",
      "citation": "[1, 2, 3]"
    },
    {
      "type": "Website",
      "url": "https://lightning.engineering/",
      "citation": ""
    }
  ],
  "tags": ["Go", "Full Node", "Most Popular"]
}
```

## Link Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | String | ✅ | Type of link (see Link Types below) |
| `url` | String | ✅ | Valid HTTP/HTTPS URL |
| `citation` | String | ✅ | Citation reference (can be empty string) |

### Link Types

Standard link types (use these when possible):

- `Website` - Official project website
- `GitHub` - GitHub repository
- `Documentation` - Official documentation
- `API Docs` - API documentation
- `App Store` - iOS App Store link
- `Google Play` - Android Google Play link
- `Download` - Direct download link
- `Blog` - Official blog
- `Twitter` - Official Twitter account
- `Discord` - Discord server
- `Telegram` - Telegram group
- `Reddit` - Reddit community
- `YouTube` - YouTube channel
- `Paper` - Academic paper or whitepaper
- `Specification` - Technical specification

### URL Requirements

- Must be valid HTTP or HTTPS URLs
- Should link to official sources when possible
- Avoid shortened URLs (bit.ly, tinyurl, etc.)
- Prefer HTTPS over HTTP

## Tags

Tags are case-sensitive strings used for filtering and categorization.

### Standard Tags

#### Technology/Language
- `JavaScript`, `TypeScript`, `Python`, `Go`, `Rust`, `C`, `C++`, `Java`, `Swift`, `Kotlin`, `Scala`

#### Platform
- `Web`, `Mobile`, `Desktop`, `CLI`, `API`
- `iOS`, `Android`, `Linux`, `Windows`, `macOS`

#### Node Types
- `Full Node`, `Light Client`, `SPV`

#### Wallet Types
- `Custodial`, `Non-Custodial`, `Hybrid`
- `Hot Wallet`, `Cold Storage`, `Hardware`

#### Features
- `Open Source`, `Enterprise`, `Self-Hosted`
- `User-Friendly`, `Advanced`, `Developer-Focused`
- `Privacy-Focused`, `KYC Required`

#### Network
- `Mainnet`, `Testnet`, `Regtest`
- `Tor Support`, `Multi-Sig`

#### Business Model
- `Free`, `Paid`, `Freemium`, `Enterprise`

### Tag Guidelines

1. **Use existing tags** when possible for consistency
2. **Keep tags relevant** - only include tags that help users find the project
3. **Be specific** - prefer `Non-Custodial Mobile Wallet` over just `Wallet`
4. **Avoid redundancy** - don't repeat information already in project_level
5. **Use proper capitalization** - `GitHub` not `github`, `iOS` not `ios`

## Validation Rules

### Required Fields
All required fields must be present and non-empty (except for citation which can be empty string).

### URL Validation
- Must start with `http://` or `https://`
- Must be accessible (return 200 status)
- Should not redirect to unrelated content

### Project Name Rules
- Must be unique within the entire dataset
- Should match official project naming
- Avoid unnecessary abbreviations

### Category Rules
- Categories should be in logical order (most important first)
- Each category should have a clear scope
- Avoid overlapping categories

## Example Complete Entry

```json
{
  "name": "Wallets",
  "description": "User-facing applications designed to facilitate instant and low-cost transactions over the Lightning Network. They can be custodial (third-party holds keys) or non-custodial (user holds keys).",
  "items": [
    {
      "project_name": "Phoenix",
      "project_level": "Non-Custodial Mobile Wallet",
      "links": [
        {
          "type": "Website", 
          "url": "https://phoenix.acinq.co/",
          "citation": ""
        },
        {
          "type": "GitHub",
          "url": "https://github.com/ACINQ/phoenix",
          "citation": ""
        },
        {
          "type": "App Store",
          "url": "https://apps.apple.com/app/phoenix-wallet/id1544097028",
          "citation": ""
        },
        {
          "type": "Google Play", 
          "url": "https://play.google.com/store/apps/details?id=fr.acinq.phoenix.mainnet",
          "citation": ""
        }
      ],
      "tags": ["Mobile", "Non-Custodial", "iOS", "Android", "Kotlin", "ACINQ"]
    }
  ]
}
```

## Common Validation Errors

### JSON Syntax Errors
- Missing commas between array elements
- Trailing commas after last array element
- Unmatched brackets or braces
- Incorrect quote marks (use double quotes)

### Schema Errors
- Missing required fields
- Empty strings where content is required
- Incorrect data types (string vs array)

### Content Errors
- Duplicate project names
- Invalid URLs
- Inconsistent tag capitalization
- Projects in wrong categories

## Tools for Validation

### Online JSON Validators
- [JSONLint](https://jsonlint.com/)
- [JSON Formatter](https://jsonformatter.curiousconcept.com/)

### Command Line
```bash
# Validate JSON syntax
python -m json.tool lngal_data.json

# Check for common issues
grep -n ",$" lngal_data.json  # Find trailing commas
```

### Browser Developer Tools
Open `index.html` locally and check browser console for errors.

## Migration Notes

When updating the schema:

1. **Backward compatibility** - ensure existing data remains valid
2. **Migration scripts** - provide tools to update existing data
3. **Documentation updates** - update this file and contributing guide
4. **Version control** - tag schema versions for reference

## Future Enhancements

Potential schema additions being considered:

- `founded_date` - When the project was started
- `last_updated` - Last known update to the project
- `license` - Software license information
- `status` - Active, inactive, deprecated
- `metrics` - GitHub stars, download counts, etc.

These would be added as optional fields to maintain backward compatibility.