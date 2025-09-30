#!/usr/bin/env python3
import os
import re
import sys
import argparse
from datetime import datetime
from colorama import init
from rich.console import Console
from rich.panel import Panel
from rich.progress import (
    Progress,
    SpinnerColumn,
    TextColumn,
    BarColumn,
    TaskProgressColumn,
)
from rich.table import Table

# ! Do `pip install rich` if you don't have it already :3

init()

console = Console()

CURRENT_YEAR = datetime.now().year
AQUA = "#00FFFF"
USERNAME = "Kars"
GITHUB = "github.com/kars1996"

SUPPORTED_EXTENSIONS = {
    "javascript": [".js", ".jsx"],
    "typescript": [".ts", ".tsx"],
    "golang": [".go"],
    "python": [".py"],
    "c": [".c", ".h"],
    "cpp": [".cpp", ".hpp", ".cc", ".hh"],
    "java": [".java"],
    "csharp": [".cs"],
    "ruby": [".rb"],
    "php": [".php"],
}

COMMENT_STYLES = {
    "javascript": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
    "typescript": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
    "golang": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
    "python": {
        "block_start": '"""',
        "block_end": '"""',
        "line": "#",
    },
    "c": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
    "cpp": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
    "java": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
    "csharp": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
    "ruby": {
        "block_start": "=begin",
        "block_end": "=end",
        "line": "#",
    },
    "php": {
        "block_start": "/*",
        "block_end": "*/",
        "line": "//",
    },
}

IGNORE_PATTERN = r"(?://|#|/\*)\s*credit-ignore"


def get_copyright_template(language):
    """Get the appropriate copyright template for the language."""
    style = COMMENT_STYLES.get(language, COMMENT_STYLES["javascript"])

    if language == "python":
        return f"""{style["block_start"]}
Copyright © {{year}} {{name}} ({{github}})

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
{style["block_end"]}"""
    else:
        return f"""{style["block_start"]}
Copyright © {{year}} {{name}} ({{github}})

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
{style["block_end"]}"""


def get_language_from_extension(extension):
    """Determine the language based on file extension."""
    for language, extensions in SUPPORTED_EXTENSIONS.items():
        if extension in extensions:
            return language
    return "javascript"  # Default to JavaScript


def find_files(directory, extensions, recursive=True):
    """Find all files with the specified extensions in the given directory."""
    matched_files = []

    if recursive:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    matched_files.append(os.path.join(root, file))
    else:
        for file in os.listdir(directory):
            file_path = os.path.join(directory, file)
            if os.path.isfile(file_path) and any(
                file.endswith(ext) for ext in extensions
            ):
                matched_files.append(file_path)

    return matched_files


def should_ignore_file(content):
    """Check if a file should be ignored based on the ignore comment."""
    return bool(re.search(IGNORE_PATTERN, content))


def check_existing_copyright(content, language):
    """Check if a file already has a copyright notice and extract its year."""
    style = COMMENT_STYLES.get(language, COMMENT_STYLES["javascript"])

    block_start_escaped = re.escape(style["block_start"])
    block_end_escaped = re.escape(style["block_end"])
    line_escaped = re.escape(style["line"])

    patterns = [
        f"{block_start_escaped}\\s*Copyright © (\\d{{4}}).*?{USERNAME}.*?{block_end_escaped}",
        f"{block_start_escaped}\\s*Copyright \\(c\\) (\\d{{4}}).*?{USERNAME}.*?{block_end_escaped}",
        f"{line_escaped} Copyright © (\\d{{4}}).*?{USERNAME}",
        f"{line_escaped} Copyright \\(c\\) (\\d{{4}}).*?{USERNAME}",
    ]

    for pattern in patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            return True, match.group(1), match.group(0)

    return False, None, None


def add_or_update_copyright(file_path, force_update=False):
    """Add or update copyright notice in a file."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, "r", encoding="latin-1") as file:
                content = file.read()
        except Exception as e:
            return "error", f"Encoding error: {str(e)}"
    except Exception as e:
        return "error", str(e)

    if should_ignore_file(content):
        return "ignored", None

    _, extension = os.path.splitext(file_path)
    language = get_language_from_extension(extension)

    has_copyright, year, old_notice = check_existing_copyright(content, language)

    if has_copyright and year == str(CURRENT_YEAR) and not force_update:
        return "skipped", None

    copyright_notice = get_copyright_template(language).format(
        year=CURRENT_YEAR, name=USERNAME, github=GITHUB
    )

    if has_copyright:
        modified_content = content.replace(old_notice, copyright_notice)

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(modified_content)

        return "updated", year

    if language == "python" and content.startswith("#!"):
        shebang_end = content.find("\n") + 1
        modified_content = (
            content[:shebang_end]
            + "\n"
            + copyright_notice
            + "\n\n"
            + content[shebang_end:]
        )
    else:
        imports_pattern = r"^import.*?$|^.*?from.*?import.*?$"
        matches = list(re.finditer(imports_pattern, content, re.MULTILINE))

        if matches:
            last_import_end = matches[-1].end()
            modified_content = (
                content[:last_import_end]
                + "\n\n"
                + copyright_notice
                + "\n\n"
                + content[last_import_end:].lstrip()
            )
        else:
            # If no imports found, add at the beginning
            modified_content = copyright_notice + "\n\n" + content

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(modified_content)

    return "added", None


def print_header():
    """Print a styled header for the CLI tool."""
    console.print("")
    console.print(
        Panel(
            "[bold white]COPYRIGHT NOTICE MANAGER[/bold white]",
            subtitle="[italic]v2.0.0[/italic]",
            border_style=AQUA,
            expand=False,
            title="[bold white]𝕂ars[/bold white]",
        )
    )


def get_all_extensions():
    """Get all supported file extensions."""
    all_extensions = []
    for extensions in SUPPORTED_EXTENSIONS.values():
        all_extensions.extend(extensions)
    return all_extensions


def print_stats(stats):
    """Print statistics of the operation."""
    table = Table(title="Operation Summary", border_style=AQUA)

    table.add_column("Category", style="dim")
    table.add_column("Count", justify="right", style="bold")

    table.add_row("Files processed", str(stats["total"]))
    table.add_row("Copyright notices added", str(stats["added"]), style="green")
    table.add_row("Copyright notices updated", str(stats["updated"]), style="blue")
    table.add_row("Files skipped (up-to-date)", str(stats["skipped"]), style=AQUA)
    table.add_row("Files ignored", str(stats["ignored"]), style="yellow")
    table.add_row("Errors", str(stats["errors"]), style="red")

    console.print("\n")
    console.print(table)


def main():
    parser = argparse.ArgumentParser(
        description="Add or update copyright notices in code files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  Process all files in the src directory:
    python copyright_manager.py
    
  Process only JavaScript files:
    python copyright_manager.py --language javascript
    
  Force update all copyright notices in the lib directory:
    python copyright_manager.py -d ./lib -f
    
  Process files in the current directory only (non-recursive):
    python copyright_manager.py --no-recursive
    
  Print information about supported languages:
    python copyright_manager.py --info
        """,
    )

    parser.add_argument(
        "-d",
        "--directory",
        help="Path to the source directory (default: ./src)",
        default="./src",
    )
    parser.add_argument(
        "-f",
        "--force",
        help="Force update of copyright notices even if year is current",
        action="store_true",
    )
    parser.add_argument(
        "-y", "--yes", help="Skip confirmation prompt", action="store_true"
    )
    parser.add_argument(
        "-l",
        "--language",
        help="Specify language to process (e.g., typescript, golang)",
        choices=list(SUPPORTED_EXTENSIONS.keys()),
        default="all",
    )
    parser.add_argument(
        "--no-recursive", help="Don't search subdirectories", action="store_true"
    )
    parser.add_argument(
        "--info",
        help="Show supported languages and file extensions",
        action="store_true",
    )

    args = parser.parse_args()

    if args.info:
        console.print(
            Panel(
                "\n".join(
                    [
                        f"[bold]{lang.capitalize()}[/bold]: {', '.join(exts)}"
                        for lang, exts in SUPPORTED_EXTENSIONS.items()
                    ]
                ),
                title="Supported Languages",
                border_style=AQUA,
            )
        )
        return

    print_header()

    if not os.path.isdir(args.directory):
        console.print(
            f"[bold red]Error:[/bold red] {args.directory} is not a valid directory."
        )
        return

    if args.language == "all":
        extensions = get_all_extensions()
    else:
        extensions = SUPPORTED_EXTENSIONS[args.language]

    files = find_files(args.directory, extensions, not args.no_recursive)

    if not files:
        console.print(f"[yellow]No matching files found in {args.directory}.[/yellow]")
        return

    console.print(f"Found [bold]{len(files)}[/bold] files to process.")

    if not args.yes:
        proceed = input("Do you want to process these files? (y/n): ")
        if proceed.lower() != "y":
            console.print("[red]Operation cancelled.[/red]")
            return

    stats = {
        "total": len(files),
        "added": 0,
        "updated": 0,
        "skipped": 0,
        "ignored": 0,
        "errors": 0,
    }

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(bar_width=None),
        TaskProgressColumn(),
        console=console,
    ) as progress:
        task = progress.add_task("[cyan]Processing files...", total=len(files))

        for file_path in files:
            relative_path = os.path.relpath(file_path)
            status, extra_info = add_or_update_copyright(file_path, args.force)

            if status in stats:
                stats[status] += 1

            if status == "added":
                progress.update(
                    task, description=f"[green]Added copyright to {relative_path}"
                )
            elif status == "updated":
                progress.update(
                    task,
                    description=f"[blue]Updated copyright ({extra_info} → {CURRENT_YEAR}) in {relative_path}",
                )
            elif status == "skipped":
                progress.update(
                    task, description=f"[cyan]Skipped {relative_path} (up to date)"
                )
            elif status == "ignored":
                progress.update(
                    task,
                    description=f"[yellow]Ignored {relative_path} (credit-ignore found)",
                )
            elif status == "error":
                progress.update(
                    task,
                    description=f"[red]Error processing {relative_path}: {extra_info}",
                )

            progress.update(task, advance=1)

    print_stats(stats)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n[yellow]Process interrupted by user.[/yellow]")
        sys.exit(1)
    except Exception as e:
        console.print(f"\n[bold red]An unexpected error occurred:[/bold red] {str(e)}")
        sys.exit(1)
