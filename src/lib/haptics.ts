/**
 * Haptic feedback utility for mobile touch devices.
 * Uses the Web Vibration API with safe fallbacks.
 */

type HapticType = "light" | "medium" | "heavy" | "success" | "selection";

export function triggerHaptic(type: HapticType = "light"): void {
  if (typeof window === "undefined" || !("vibrate" in navigator)) {
    return;
  }

  try {
    switch (type) {
      case "light":
      case "selection":
        navigator.vibrate(8);
        break;
      case "medium":
        navigator.vibrate(15);
        break;
      case "heavy":
        navigator.vibrate(25);
        break;
      case "success":
        navigator.vibrate([10, 40, 15]);
        break;
    }
  } catch {
    // Ignore environments where vibration is blocked or restricted
  }
}
