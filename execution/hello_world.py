#!/usr/bin/env python3
import sys
import datetime

def main():
    """
    Simple hello world script to verify execution environment.
    """
    print(f"Hello from the execution layer!")
    print(f"Current time: {datetime.datetime.now()}")
    print(f"Python version: {sys.version}")

if __name__ == "__main__":
    main()
