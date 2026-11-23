# Musik-Spur fürs Produktvideo (Querformat): das KIPPWERK-Thema wie im Spiel (Am – F – C – G, 16 Takte A–A'–B–A''),
# ruhiger Einstieg wie im Menü, dann Spiel-Musik in steigenden Stufen (Hi-Hat, Bass-Drum, treibender Bass), sanftes Ende.
import numpy as np, wave, sys
SR=44100; DUR=float(sys.argv[1]) if len(sys.argv)>1 else 84.3
CH=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]]; ARP=[0,1,2,1,0,2,1,2]
_=0;P=-1
SRC=[[76,_,72,74,76,_,74,72, 69,_,69,72,77,_,76,74, 72,_,_,76,79,_,76,72, 74,_,71,72,74,_,_,P],
     [76,_,72,74,76,_,74,72, 69,_,69,72,77,_,76,74, 72,_,_,76,79,_,76,72, 74,_,76,74,71,_,_,P],
     [81,_,_,79,76,_,72,P,   77,_,76,77,81,_,_,P,   79,_,76,72,76,_,79,P,   71,_,72,74,76,_,_,P],
     [76,_,72,74,76,_,74,72, 69,_,69,72,77,_,76,74, 72,_,_,76,79,_,76,72, 74,_,71,74,69,_,_,P]]
MEL=[]
for ph in SRC:
    row=[]
    for i,n in enumerate(ph):
        if n<=0: row.append(None); continue
        l=1
        while i+l<len(ph) and ph[i+l]==0: l+=1
        row.append((n,l))
    MEL.append(row)
hz=lambda m:440*2**((m-69)/12)
buf=np.zeros(int(SR*(DUR+3)));rng=np.random.default_rng(7)
def osc(kind,f,tt):
    ph=2*np.pi*f*tt
    if kind=='sine': return np.sin(ph)
    if kind=='tri': return (2/np.pi)*np.arcsin(np.sin(ph))
    return np.sign(np.sin(ph))*0.6
def note(f,t,d,kind,vol):
    n=int((d+.05)*SR); tt=np.arange(n)/SR
    env=np.minimum(tt/.02,1)*np.exp(np.log(1e-4)*np.clip((tt-.02)/max(d-.02,1e-3),0,1))
    i=int(t*SR); buf[i:i+n]+=osc(kind,f,tt)*env*vol
def noise(t,d,vol,hp):
    n=int(d*SR); x=rng.standard_normal(n); 
    if hp: x=np.diff(np.concatenate([[0],x]))   # hell (Hi-Hat)
    env=np.exp(np.log(1e-4)*np.arange(n)/n); i=int(t*SR); buf[i:i+n]+=x*env*vol
def kick(t,v):
    n=int(.2*SR); tt=np.arange(n)/SR; f=130*np.exp(np.log(42/130)*np.clip(tt/.12,0,1))
    ph=2*np.pi*np.cumsum(f)/SR; i=int(t*SR); buf[i:i+n]+=np.sin(ph)*np.exp(np.log(1e-4)*tt/.2)*v
# Abschnitte (Sekunden): Menü-Stil bis 4, Spiel ab 4 mit Stufen; Schluss ab DUR-5 wieder ruhig
def stage(t):
    if t<4.2 or t>DUR-5: return -1
    return 0 if t<14 else 1 if t<30 else 2 if t<50 else 3
BPM={-1:84,0:88,1:93,2:98,3:104}
step=0;t=.05
while t<DUR:
    st=stage(t);E=60/BPM[st]/2;s=step%8;ch=CH[(step//8)%4];ph=(step//32)%4;m=MEL[ph][step%32]
    if st<0:
        if s==0: note(hz(ch[0]-12),t,E*7,'sine',.11); [note(hz(x),t,E*8.5,'sine',.022) for x in ch]
        if s==4: note(hz(ch[0]-12),t,E*3,'sine',.07)
        if s%2==0: note(hz(ch[ARP[s]]+12),t,E*1.7,'tri',.02)
        if m: note(hz(m[0]),t,E*m[1]*.92,'sine',.05)
    else:
        if s==0: [note(hz(x),t,E*8.5,'sine',.02) for x in ch]
        if st<3:
            if s==0: note(hz(ch[0]-12),t,E*7,'sine',.11)
            if s==4: note(hz(ch[0]-12),t,E*3,'sine',.07)
        else: note(hz(ch[2 if s%2 else 0]-12),t,E*.9,'sine',.08)
        note(hz(ch[ARP[s]]),t,E*1.5,'tri',.02)
        if m: note(hz(m[0]),t,E*m[1]*.92,'sq',.016); note(hz(m[0]),t,E*m[1]*.92,'tri',.028)
        if st>=1 and s%2==1: noise(t,.045,.02,True)
        if st>=2 and s in (0,4): kick(t,.16)
    step+=1; t+=E
buf=buf[:int(SR*DUR)]
a=np.exp(-2*np.pi*2200/SR); y=np.zeros_like(buf); acc=0.0
for i,x in enumerate(buf): acc=(1-a)*x+a*acc; y[i]=acc
n=len(y); fade=np.ones(n); fi=int(.6*SR); fo=int(2.5*SR)
fade[:fi]=np.linspace(0,1,fi); fade[-fo:]=np.linspace(1,0,fo); y*=fade
y=y/np.max(np.abs(y))*0.72
pcm=(y*32767).astype(np.int16); st2=np.repeat(pcm[:,None],2,axis=1)
with wave.open('music_wide.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st2.tobytes())
print('ok',n/SR)
