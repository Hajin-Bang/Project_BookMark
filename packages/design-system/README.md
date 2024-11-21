# 🎨 Bookmark 디자인 시스템

Bookmark 프로젝트에 사용된 디자인 컴포넌트를 작업한 폴더입니다.

<br/>

## 📄 디자인 시스템 문서

- `packages`에 있는 컴포넌트들의 사용법은 `Storybook`을 참고할 수 있습니다.
- **[Storybook 바로가기](https://6732e743fa87136382932358-riclmiobvb.chromatic.com/)**

<br/>

## ⚙️ 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/Context API-0A1837?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=React&logoColor=white">

<br/>

## 💡 구현 과정

- [제어/비제어 컴포넌트에 대한 이해와 구현](https://hajin-bangs-organization.gitbook.io/bookmark/undefined-2/undefined-1/undefined-1)
- [컴파운드 컴포넌트 패턴 적용](https://hajin-bangs-organization.gitbook.io/bookmark/undefined-2/undefined-1/undefined)

<br/>

## 🗂️ 디자인 시스템 폴더 구조

```
🎨 packages/design-system             # 디자인 시스템 패키지 폴더
┣ 📂.storybook                         # Storybook 설정 폴더
┃ ┣ 📜main.ts                           # Storybook의 주요 설정 파일
┃ ┗ 📜preview.tsx                       # Storybook 프리뷰 설정 파일
┣ 📂src                               # 디자인 시스템 소스 코드 폴더
┃ ┣ 📂badge
┃ ┣ 📂button
┃ ┣ 📂card
┃ ┣ 📂input
┃ ┣ 📂label
┃ ┣ 📂modal
┃ ┣ 📂select
┃ ┣ 📂textarea
┃ ┣ 📂toast
┃ ┣ 📂tokens                           # 공용 디자인 토큰 관리 폴더
┃ ┃ ┣ 📜palette.ts                      # 색상 팔레트 설정 파일
┃ ┃ ┗ 📜typography.ts                   # 타이포그래피 설정 파일
┃ ┗ 📜tailwind.css                     # Tailwind CSS 설정 파일
┣ 📜package.json
┣ 📜tsconfig.json
┗ 📜README.md
```
