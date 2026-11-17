# Musik-Spur wie im Spiel (Am – F – C – G), als WAV fürs Video
import numpy as np, wave, sys
SR=44100; DUR=float(sys.argv[1]) if len(sys.argv)>1 else 29.2
E=60/84/2; CH=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]]; ARP=[0,1,2,1,0,2,1,2]
hz=lambda m:440*2**((m-69)/12)
buf=np.zeros(int(SR*(DUR+3)))
def note(f,t,d,kind,vol):
    n=int((d+.05)*SR); tt=np.arange(n)/SR
    w=np.sin(2*np.pi*f*tt) if kind=='sine' else (2/np.pi)*np.arcsin(np.sin(2*np.pi*f*tt))
    env=np.minimum(tt/.03,1)*np.exp(np.log(1e-4)*np.clip((tt-.03)/max(d-.03,1e-3),0,1))
    i=int(t*SR); buf[i:i+n]+=w*env*vol
step=0;t=.05
while t<DUR:
    bar=(step//8)%4; s=step%8; ch=CH[bar]; ph=(step//32)%4
    if s==0:
        note(hz(ch[0]-12),t,E*7,'sine',.11)
        for m in ch: note(hz(m),t,E*8.5,'sine',.022)
    if s==4: note(hz(ch[0]-12),t,E*3,'sine',.07)
    if ph>0 or s%2==0: note(hz(ch[ARP[s]]+12+(12 if ph==3 and s==7 else 0)),t,E*1.7,'tri',.032)
    step+=1; t+=E
buf=buf[:int(SR*DUR)]
# weicher Tiefpass (wie im Spiel), Ein-/Ausblenden, Lautheit
a=np.exp(-2*np.pi*1900/SR); y=np.zeros_like(buf); acc=0
for i,x in enumerate(buf): acc=(1-a)*x+a*acc; y[i]=acc
n=len(y); fade=np.ones(n); fi=int(.6*SR); fo=int(1.8*SR)
fade[:fi]=np.linspace(0,1,fi); fade[-fo:]=np.linspace(1,0,fo); y*=fade
y=y/np.max(np.abs(y))*0.7
pcm=(y*32767).astype(np.int16); st=np.repeat(pcm[:,None],2,axis=1)
with wave.open('music.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok',n/SR)
