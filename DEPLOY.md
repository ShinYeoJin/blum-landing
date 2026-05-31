# 배포 방법

## 1. GitHub 레포지토리 생성

터미널에서 아래 명령어를 순서대로 실행하세요:

```bash
# GitHub CLI 설치 (없을 경우)
brew install gh

# GitHub 로그인
gh auth login

# 레포지토리 생성 + push
gh repo create blum-landing --public --source=. --remote=origin --push
```

또는 GitHub.com에서 직접 `blum-landing` 레포지토리 생성 후:

```bash
git remote add origin https://github.com/YOUR_USERNAME/blum-landing.git
git push -u origin main
```

## 2. Vercel 배포

### 방법 A: Vercel 웹사이트 (권장)
1. https://vercel.com 접속 → New Project
2. GitHub 레포지토리 Import
3. Framework: Next.js (자동감지)
4. Deploy 클릭

### 방법 B: Vercel CLI
```bash
# 터미널에서 실행
cd ~/blum-landing
npx vercel login    # 로그인
npx vercel --prod   # 배포
```

## 페이지 구조
- `/`    → 버전 선택 페이지
- `/v1`  → 미니멀/모던 (무채색)
- `/v2`  → 따뜻한/감성적 (우드톤)
- `/v3`  → 트렌디/볼드 (레드 액센트)
