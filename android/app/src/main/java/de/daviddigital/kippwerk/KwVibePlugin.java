package de.daviddigital.kippwerk;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.os.Build;
import android.os.VibrationAttributes;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.os.VibratorManager;
import android.view.HapticFeedbackConstants;
import android.view.View;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Eigene Vibration für KIPPWERK.
 * Das Standard-Haptics-Plugin vibriert ohne „Verwendungszweck“; viele Geräte (z. B. Samsung, Pixel ab Android 13)
 * dämpfen oder ignorieren solche Vibrationen. Hier wird ausdrücklich als Spiel/Medien-Vibration vibriert,
 * zusätzlich (wenn gewünscht) mit dem System-Haptik-Feedback.
 */
@CapacitorPlugin(name = "KwVibe")
public class KwVibePlugin extends Plugin {

    private Vibrator vibrator() {
        Context ctx = getContext();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            VibratorManager vm = (VibratorManager) ctx.getSystemService(Context.VIBRATOR_MANAGER_SERVICE);
            return vm != null ? vm.getDefaultVibrator() : null;
        }
        return (Vibrator) ctx.getSystemService(Context.VIBRATOR_SERVICE);
    }

    @PluginMethod
    public void vibrate(PluginCall call) {
        int ms = Math.max(5, Math.min(400, call.getInt("ms", 30)));
        int amp = Math.max(1, Math.min(255, call.getInt("amp", 255)));
        boolean touch = Boolean.TRUE.equals(call.getBoolean("touch", false));
        JSObject r = new JSObject();
        try {
            Vibrator v = vibrator();
            if (v == null || !v.hasVibrator()) {
                r.put("ok", false); r.put("why", "kein Vibrationsmotor");
                call.resolve(r); return;
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                VibrationEffect e = VibrationEffect.createOneShot(ms, v.hasAmplitudeControl() ? amp : VibrationEffect.DEFAULT_AMPLITUDE);
                if (Build.VERSION.SDK_INT >= 33) {
                    v.vibrate(e, VibrationAttributes.createForUsage(VibrationAttributes.USAGE_MEDIA));
                } else {
                    v.vibrate(e, new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_GAME)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION).build());
                }
            } else {
                v.vibrate(ms);
            }
            if (touch && getActivity() != null) {
                getActivity().runOnUiThread(() -> {
                    View d = getActivity().getWindow().getDecorView();
                    d.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS, HapticFeedbackConstants.FLAG_IGNORE_GLOBAL_SETTING);
                });
            }
            r.put("ok", true);
        } catch (Exception ex) {
            r.put("ok", false); r.put("why", ex.getClass().getSimpleName() + ": " + ex.getMessage());
        }
        call.resolve(r);
    }

    /** Für die Diagnose in den Einstellungen */
    @PluginMethod
    public void info(PluginCall call) {
        JSObject r = new JSObject();
        Vibrator v = vibrator();
        r.put("hasVibrator", v != null && v.hasVibrator());
        r.put("amplitude", v != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && v.hasAmplitudeControl());
        r.put("sdk", Build.VERSION.SDK_INT);
        r.put("maker", Build.MANUFACTURER);
        AudioManager am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
        int mode = am != null ? am.getRingerMode() : -1;
        r.put("ringer", mode == AudioManager.RINGER_MODE_SILENT ? "lautlos" : mode == AudioManager.RINGER_MODE_VIBRATE ? "vibration" : mode == AudioManager.RINGER_MODE_NORMAL ? "normal" : "?");
        call.resolve(r);
    }
}
