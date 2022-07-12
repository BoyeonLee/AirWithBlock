# ![202207110156ZBE_30](https://user-images.githubusercontent.com/78004477/178167085-0fdf7797-491e-4504-afd0-f822eaba6279.gif) AirWithBlock
Airbnb With Blockchain의 줄임말인 **AirWithBlock** 입니다. 자신의 집을 등록하고 블록체인을 이용해 예약 할 수 있는 사이트입니다. <br>
블록체인을 통해 호스트와 게스트는 중개자 없이 거래할 수 있습니다. 

## 1. 프로젝트 소개
블록체인을 이용하면 구매자와 판매자가 중개자 없이 거래할 수 있습니다. 현재 중개자가 있는 서비스에서 중개자가 없다면 어떻게 해야할까 <br>
고민했습니다. 에어비앤비가 떠올랐고 에어비앤비의 역할을 블록체인으로 바꾸면 되겠다고 생각했습니다. 에어비앤비 사이트에 블록체인을 <br> 
이용해 중개자 없이 호스트와 게스트가 거래할 수 있는 사이트를 만들게 되었습니다.
호스트와 게스트의 거래는 블록체인 기록됩니다. 

## 2. 프로젝트 주요 기능 설명
### 호스트 기준
- 호스트는 자신의 집을 등록할 수 있습니다.
- 호스트는 자신의 집 정보를 수정하고 삭제할 수 있습니다. (다만, 앞으로의 예약이 있는 경우 삭제할 수 없습니다.)
- 자신의 집이 예약이 되면 호스트는 집 비밀번호를 등록할 수 있습니다.
- 호스트는 등록한 비밀번호를 수정할 수 있습니다. (다만, 체크인하는 날에는 수정할 수 없습니다.)
- 비밀번호를 등록한 후 게스트가 체크인하는 날에 비밀번호를 확인하지 않았다면 체크인 이후에 호스트가 직접 정산할 수도 있습니다. 

### 게스트 기준
- 게스트는 예약이 없는 날짜 중 자신이 원하는 날짜에 예약할 수 있습니다. 
- 게스트는 예약을 취소할 수 있습니다. <br>
  (체크인 기준 최소 3일 이전 : 30% 환불, 최소 7일 이전 : 50% 환불, 최소 8일 이후 : 100% 환불) <br>
  (체크인 당일에는 취소할 수 없습니다.)
- 예약 취소가 되면 환불 규정에 맞게 호스트와 게스트의 계좌로 입금됩니다.
- 게스트는 체크인 하는 날에만 비밀번호를 볼 수 있습니다.

## 3. 프로젝트의 전체적인 Flow
- Kaikas에서 받은 account를 가지고 Server에서 public_key, private_key 만들어서 DB에 넣고 Client에 전송합니다. <br>
  (이미 DB에 있으면 다시 생성하지 않습니다.)
- 호스트가 집을 등록하면 DB에 넣습니다.
- 게스트가 집을 예약하고 Smart-Contract 계좌로 송금합니다. (게스트가 비밀번호를 확인하기 전까지 돈은 Smart-Contract에 있습니다.)
- 송금 후 트랜잭션 코드 받고 예약 정보를 DB에 넣습니다.
- 예약이 되면 호스트는 집 비밀번호를 등록합니다. 집 비밀번호는 게스트의 public_key로 암호화되어 DB에 저장됩니다.
- 체크인 하는 날에 게스트는 집 비밀번호를 확인할 수 있습니다. 
- 호스트가 등록한 비밀번호를 게스트의 private_key로 복호화해서 보여줍니다.
- 게스트가 집 비밀번호를 확인하면 Smart-Contract에서 호스트의 계좌로 송금합니다.

## 4. 프로젝트 구성도
- [API 명세서](https://boyeonsprojectnote.notion.site/b065a270129b4a0488667b430edeeb59?v=177dadfa764e47188b1fde09dffc6050)

- [DB Diagram](https://dbdiagram.io/d/62aff67469be0b672cfd568d) <br>
![AirWithBlock_db](https://user-images.githubusercontent.com/78004477/178170860-cae73bfc-4ada-494a-b8f0-0d4d2dc7ce76.png)

- [Wireframe](https://dbdiagram.io/d/62aff67469be0b672cfd568d) <br>
![wireframe](https://user-images.githubusercontent.com/78004477/178171198-ded1bea1-1f8a-4ceb-8b00-3a12b66621b8.png)

## 5. 기술 스택
- Smart-Contract는 **Solidity**를 이용해 작성했습니다.
- Blockchain은 **Klaytn**의 **Baobab Test Network**를 이용했습니다.
- Smart-Contract와 Frontend와의 연결은 **Caver.js**를 이용했습니다.
- Smart-Wallet은 **Kaikas**를 이용했습니다.
- Frontend는 **React**, Backend는 **Node.js**, Database는 **MYSQL**을 이용했습니다.
- CSS는 **Chakra-ui**를 이용했습니다.
- 배포는 **Heroku**를 이용했습니다.

## 6. 진행 기간
- 2022-06-13 ~ 2022-07-03

## 7. 버전
- 1.0

## 8. 데모
### - 집 등록하기
![집 등록_gif](https://user-images.githubusercontent.com/78004477/178173561-69168f19-ab93-41b9-b7b9-8cf767503212.gif)

### - 집 정보 수정 및 삭제하기
![집 수정_삭제_gif](https://user-images.githubusercontent.com/78004477/178173689-102ceeb7-1b2f-417d-8471-78160071231f.gif)

### - 집 예약하기
![집 예약_gif](https://user-images.githubusercontent.com/78004477/178173757-17dc6479-6c7a-4cfb-821c-456484dbf95d.gif)

### - 집 예약 취소하기
![예약 취소_gif](https://user-images.githubusercontent.com/78004477/178173813-86ce7406-43e5-40f5-8079-3650807fcfa9.gif)

### - 집 비밀번호 등록 및 확인하기
![비번 등록 및 확인_gif](https://user-images.githubusercontent.com/78004477/178173874-1689cfb9-251c-4f50-86df-129c263a7f42.gif)

### - 집 비밀번호 수정하기
![비번 수정_gif](https://user-images.githubusercontent.com/78004477/178173924-dcd35e6f-e5e6-4437-83ac-f88b065fddc7.gif)

### - 정산하기
![예약 정산_gif](https://user-images.githubusercontent.com/78004477/178173964-6bcd47ec-e360-4027-b5ca-c2314ddb6161.gif)

## 9. 추가로 구현하고 싶은 부분
- 알림 기능 : 게스트가 예약할 때, 호스트가 비밀번호를 입력할 때 호스트와 게스트에게 알람이 떠 바로 알게끔 하고 싶습니다.
- 사용자 계정의 public_key, private_key 가지고 와서 비밀번호 암호화, 복호화 하기

