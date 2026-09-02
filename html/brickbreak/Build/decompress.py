from pathlib import Path
import brotli

for source in Path(".").glob("*.br"):
    destination = source.with_suffix("")
    
    print(f"Decompressing {source.name}")
    
    compressed_data = source.read_bytes()
    decompressed_data = brotli.decompress(compressed_data)
    
    destination.write_bytes(decompressed_data)
    
    print(f"Created {destination.name}")

print("Finished.")