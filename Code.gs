/**
 * Example usage in Google Sheets:
 * =IPV4TODECIMAL("192.0.2.1")
 * =IPV6TODECIMAL("2001:db8::1")
 */

function IPV4TODECIMAL(ipv4) {
  if (!ipv4 || typeof ipv4 !== "string") {
    return "Invalid input: Provide an IPv4 address as a string.";
  }

  // Remove any leading/trailing whitespace
  ipv4 = ipv4.trim();

  // Split
  let octets = ipv4.split(".");

  // Check
  if (octets.length !== 4) {
    return "Invalid IPv4 address: Must contain exactly 4 octets.";
  }

  // Convert
  let decimal = 0;
  for (let i = 0; i < 4; i++) {
    let octet = octets[i];
    
    // Check validity
    if (!/^\d+$/.test(octet) || octet.length > 3) {
      return "Invalid IPv4 address: Each octet must be a number (0-255).";
    }    

    // Multiply out
    decimal = decimal * 256 + parseInt(octet, 10);
  }
  return decimal;
}

function IPV6TODECIMAL(ipv6) {
  if (!ipv6 || typeof ipv6 !== "string") {
    return "Invalid input: Provide an IPv6 address as a string.";
  }

  // Remove any leading/trailing whitespace
  ipv6 = ipv6.trim();

  // Expand
  let segments = expandIPv6(ipv6);
  if (segments.length !== 8) {
    return "Invalid IPv6 address: Must resolve to 8 segments.";
  }

  let hexString = segments.join("");
  let decimalValue = BigInt("0x" + hexString);

  // Return as string to avoid precision loss in Sheets
  return decimalValue.toString();
}

function expandIPv6(ipv6) {
  // Split
  let parts = ipv6.split(":");

  // Unabbreviate
  let doubleColonIndex = ipv6.indexOf("::");
  if (doubleColonIndex !== -1) {
    let before = ipv6.substring(0, doubleColonIndex).split(":").filter(Boolean);
    let after = ipv6.substring(doubleColonIndex + 2).split(":").filter(Boolean);
    let missingSegments = 8 - (before.length + after.length);
    let zeros = Array(missingSegments).fill("0000");
    parts = [...before, ...zeros, ...after];
  }

  // Pad
  let expanded = parts.map(segment => {
    segment = segment.toLowerCase();
    if (!/^[0-9a-f]{1,4}$/.test(segment)) {
      throw new Error("Invalid hex segment");
    }
    return segment.padStart(4, "0");
  });

  return expanded;
}
