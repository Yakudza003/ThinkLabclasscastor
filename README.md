# Task Automation Script

A comprehensive Python script that demonstrates three common automation tasks using standard libraries.

## Features

This script includes three automation examples:

1. **File Management**: Move all .jpg files from one folder to another
2. **Text Processing**: Extract email addresses from a text file and save them to a new file
3. **Web Scraping**: Scrape the title of a webpage and save it to a file

## Requirements

- Python 3.6+
- requests library (for web scraping)

## Installation

1. Clone or download this repository
2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Running the Complete Demo

```bash
python task_automation.py
```

This will:
- Create sample files for testing
- Execute all three automation tasks
- Generate output files in the `output/` directory
- Create detailed logs in `automation.log`

### Individual Task Usage

You can also use the `TaskAutomation` class directly in your own scripts:

```python
from task_automation import TaskAutomation

automation = TaskAutomation()

# Move .jpg files
automation.move_jpg_files('source_folder', 'destination_folder')

# Extract emails
automation.extract_emails('input.txt', 'emails.txt')

# Scrape webpage title
automation.scrape_webpage_title('https://example.com', 'title.txt')
```

## Task Details

### 1. File Moving (.jpg files)
- **Function**: `move_jpg_files(source_folder, destination_folder)`
- **Features**:
  - Handles both .jpg and .jpeg extensions (case insensitive)
  - Creates destination folder if it doesn't exist
  - Provides detailed logging
  - Graceful error handling

### 2. Email Extraction
- **Function**: `extract_emails(input_file, output_file)`
- **Features**:
  - Uses comprehensive regex pattern for email validation
  - Removes duplicate emails while preserving order
  - Handles empty files gracefully
  - UTF-8 encoding support

### 3. Web Scraping
- **Function**: `scrape_webpage_title(url, output_file)`
- **Features**:
  - Validates URL format
  - Handles network timeouts and errors
  - Cleans HTML entities from titles
  - Includes timestamp in output

## Error Handling

The script includes comprehensive error handling for:
- Missing files and directories
- Network connectivity issues
- Invalid URLs
- Empty files
- Permission errors
- Encoding issues

## Output

All results are saved in the `output/` directory:
- `moved_images/` - Contains moved .jpg files
- `extracted_emails.txt` - List of extracted email addresses
- `scraped_title.txt` - Webpage title with metadata

## Logging

Detailed logs are written to `automation.log` and displayed in the console, including:
- Task execution status
- Error messages and stack traces
- File operation details
- Network request information

## Key Concepts Demonstrated

- **File Handling**: Using `os`, `shutil`, and `pathlib` for file operations
- **Regular Expressions**: Pattern matching for email extraction and HTML parsing
- **Web Scraping**: HTTP requests and HTML parsing
- **Error Handling**: Try-catch blocks and graceful failure handling
- **Logging**: Comprehensive logging for debugging and monitoring
- **Object-Oriented Design**: Clean class structure for reusability

## Example Output

```
============================================================
TASK AUTOMATION SCRIPT
============================================================

Creating sample files for demonstration...

TASK 1: Moving .jpg files
------------------------------
✅ Task 1 completed successfully!

TASK 2: Extracting email addresses
-----------------------------------
✅ Task 2 completed successfully!

TASK 3: Scraping webpage title
------------------------------
✅ Task 3 completed successfully!

============================================================
AUTOMATION COMPLETE!
Check the 'output' folder for results and 'automation.log' for detailed logs.
============================================================
```
