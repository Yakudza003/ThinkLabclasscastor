#!/usr/bin/env python3
"""
Task Automation Script
======================

This script provides three automation examples:
1. Move all .jpg files from one folder to another
2. Extract email addresses from a text file and save them to a new file
3. Scrape the title of a webpage and save it to a file

Author: Task Automation Script
Date: 2024
"""

import os
import shutil
import re
import requests
from pathlib import Path
import logging
from typing import List, Optional
from urllib.parse import urlparse
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('automation.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class TaskAutomation:
    """Main class for handling various automation tasks."""
    
    def __init__(self):
        """Initialize the TaskAutomation class."""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def move_jpg_files(self, source_folder: str, destination_folder: str) -> bool:
        """
        Move all .jpg files from source folder to destination folder.
        
        Args:
            source_folder (str): Path to source folder
            destination_folder (str): Path to destination folder
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Validate source folder
            if not os.path.exists(source_folder):
                logger.error(f"Source folder does not exist: {source_folder}")
                return False
            
            # Create destination folder if it doesn't exist
            os.makedirs(destination_folder, exist_ok=True)
            logger.info(f"Created destination folder: {destination_folder}")
            
            # Find all .jpg files (case insensitive)
            jpg_files = []
            for file in os.listdir(source_folder):
                if file.lower().endswith(('.jpg', '.jpeg')):
                    jpg_files.append(file)
            
            if not jpg_files:
                logger.warning(f"No .jpg files found in {source_folder}")
                return True
            
            # Move files
            moved_count = 0
            for file in jpg_files:
                source_path = os.path.join(source_folder, file)
                dest_path = os.path.join(destination_folder, file)
                
                try:
                    shutil.move(source_path, dest_path)
                    logger.info(f"Moved: {file}")
                    moved_count += 1
                except Exception as e:
                    logger.error(f"Failed to move {file}: {str(e)}")
            
            logger.info(f"Successfully moved {moved_count} .jpg files")
            return True
            
        except Exception as e:
            logger.error(f"Error in move_jpg_files: {str(e)}")
            return False
    
    def extract_emails(self, input_file: str, output_file: str) -> bool:
        """
        Extract email addresses from a text file and save them to a new file.
        
        Args:
            input_file (str): Path to input text file
            output_file (str): Path to output file for emails
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Check if input file exists
            if not os.path.exists(input_file):
                logger.error(f"Input file does not exist: {input_file}")
                return False
            
            # Read input file
            with open(input_file, 'r', encoding='utf-8') as file:
                content = file.read()
            
            if not content.strip():
                logger.warning(f"Input file is empty: {input_file}")
                return True
            
            # Email regex pattern (more comprehensive)
            email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
            emails = re.findall(email_pattern, content)
            
            # Remove duplicates while preserving order
            unique_emails = list(dict.fromkeys(emails))
            
            if not unique_emails:
                logger.warning("No email addresses found in the input file")
                return True
            
            # Write emails to output file
            with open(output_file, 'w', encoding='utf-8') as file:
                for email in unique_emails:
                    file.write(email + '\n')
            
            logger.info(f"Extracted {len(unique_emails)} unique email addresses")
            logger.info(f"Saved to: {output_file}")
            return True
            
        except Exception as e:
            logger.error(f"Error in extract_emails: {str(e)}")
            return False
    
    def scrape_webpage_title(self, url: str, output_file: str) -> bool:
        """
        Scrape the title of a webpage and save it to a file.
        
        Args:
            url (str): URL of the webpage to scrape
            output_file (str): Path to output file for the title
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Validate URL
            parsed_url = urlparse(url)
            if not parsed_url.scheme or not parsed_url.netloc:
                logger.error(f"Invalid URL format: {url}")
                return False
            
            # Add protocol if missing
            if not parsed_url.scheme:
                url = 'https://' + url
            
            logger.info(f"Scraping title from: {url}")
            
            # Make request with timeout
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            # Extract title using regex
            title_pattern = r'<title[^>]*>(.*?)</title>'
            title_match = re.search(title_pattern, response.text, re.IGNORECASE | re.DOTALL)
            
            if not title_match:
                logger.warning("No title tag found on the webpage")
                title = "No title found"
            else:
                title = title_match.group(1).strip()
                # Clean up HTML entities and extra whitespace
                title = re.sub(r'\s+', ' ', title)
                title = title.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
            
            # Write title to output file
            with open(output_file, 'w', encoding='utf-8') as file:
                file.write(f"URL: {url}\n")
                file.write(f"Title: {title}\n")
                file.write(f"Scraped at: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            
            logger.info(f"Title scraped successfully: {title}")
            logger.info(f"Saved to: {output_file}")
            return True
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error while scraping {url}: {str(e)}")
            return False
        except Exception as e:
            logger.error(f"Error in scrape_webpage_title: {str(e)}")
            return False
    
    def create_sample_files(self) -> None:
        """Create sample files for testing the automation functions."""
        try:
            # Create sample directories
            os.makedirs('sample_images', exist_ok=True)
            os.makedirs('output', exist_ok=True)
            
            # Create sample text file with emails
            sample_text = """
            Contact Information:
            John Doe - john.doe@example.com
            Jane Smith - jane.smith@company.org
            Support Team - support@mywebsite.com
            Admin - admin@test.net
            
            Other contacts:
            info@sample.com
            contact@business.co.uk
            hello@startup.io
            
            Some text without emails here.
            Another email: test@domain.com
            """
            
            with open('sample_emails.txt', 'w', encoding='utf-8') as file:
                file.write(sample_text)
            
            # Create some sample .jpg files (empty files for demonstration)
            sample_files = ['photo1.jpg', 'image2.JPG', 'picture3.jpeg']
            for filename in sample_files:
                filepath = os.path.join('sample_images', filename)
                with open(filepath, 'w') as file:
                    file.write("Sample image file")
            
            logger.info("Sample files created successfully")
            
        except Exception as e:
            logger.error(f"Error creating sample files: {str(e)}")


def main():
    """Main function to demonstrate the automation tasks."""
    automation = TaskAutomation()
    
    print("=" * 60)
    print("TASK AUTOMATION SCRIPT")
    print("=" * 60)
    print()
    
    # Create sample files for demonstration
    print("Creating sample files for demonstration...")
    automation.create_sample_files()
    print()
    
    # Task 1: Move .jpg files
    print("TASK 1: Moving .jpg files")
    print("-" * 30)
    success = automation.move_jpg_files('sample_images', 'output/moved_images')
    if success:
        print("✅ Task 1 completed successfully!")
    else:
        print("❌ Task 1 failed. Check the logs for details.")
    print()
    
    # Task 2: Extract emails
    print("TASK 2: Extracting email addresses")
    print("-" * 35)
    success = automation.extract_emails('sample_emails.txt', 'output/extracted_emails.txt')
    if success:
        print("✅ Task 2 completed successfully!")
    else:
        print("❌ Task 2 failed. Check the logs for details.")
    print()
    
    # Task 3: Scrape webpage title
    print("TASK 3: Scraping webpage title")
    print("-" * 30)
    # Using a reliable test URL
    test_url = "https://httpbin.org/html"
    success = automation.scrape_webpage_title(test_url, 'output/scraped_title.txt')
    if success:
        print("✅ Task 3 completed successfully!")
    else:
        print("❌ Task 3 failed. Check the logs for details.")
    print()
    
    print("=" * 60)
    print("AUTOMATION COMPLETE!")
    print("Check the 'output' folder for results and 'automation.log' for detailed logs.")
    print("=" * 60)


if __name__ == "__main__":
    main()
