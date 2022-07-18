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
  - 지난 NFT-Exchange에서 Ethereum의 Test Network를 이용했는데 transaction이 체결되기까지 시간도 오래 걸렸습니다.
  - 이번에는 transaction 처리 속도가 3000TPS인 Klaytn을 이용하게 되었습니다.
  - transaction 처리 속도를 비교했을 때 Ethereum은 최대 1~2분 정도 소요되었고, Klaytn은 최대 10초 소요되었습니다.
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

## 9. 문제 발생 + 해결 방안
### 1. Kaikas에서 사용자 계정의 Public_key, Private_key 가지고 오기
- 원래 계획
  - Kaikas에서 사용자의 Klaytn 계정에서 Public_key, Private_key를 가지고 온다. 
  - 호스트가 집 비밀번호를 입력하면 게스트의 Public_key로 암호화해서 게스트만이 복호화할 수 있게 한다. 암호화된 비밀번호는 <br> 블록체인에 저장한다. 
  - 게스트가 집 비밀번호를 확인할 때는 게스트의 Private_key로 복호화해서 알려준다.
  
- 문제 정의
  - Kaikas에 있는 사용자의 계정에서 Public_key와 Private_key를 가져올 수 없다.
  - KAS를 이용하면 Public_key와 Private_key를 가지고 올 수 있으나 그렇게 하려면 Kaikas에서 사용자의 계정을 가지고 오는 게 아니라 KAS를 이용해 사용자에게 계정을 만들어줘야 한다.
  - KAS를 이용해서 사용자의 계정을 만들어주면 사이트에서 사용자의 계정 또한 관리해야 한다. (사용자가 keystore 파일을 잃어버렸거나 비밀번호를 잃어버렸을 때 등에 대비해야 한다.)
  - 사용자의 계정 관리를 Kaikas에게 맡기기 위해 KAS를 사용할 수 없었다.

- 해결 방법
  - Kaikas에서 사용자의 계정 주소(address)를 받는다.
  - server에서 crypto를 이용하여 1개의 계정에 대응하는 Public_key, Private_key를 생성해서 DB에 저장한다.
  - 비밀번호를 암호화하거나 복호화할 때 DB에 있는 게스트 계정의 Public_key와 Private_key를 이용한다.
  - 게스트의 Public_key로 암호화한 호스트 집의 비밀번호는 DB에 저장한다.
  
- 아쉬운 점
  - 블록체인이 아닌 DB에 저장해 탈중앙화하지 못해서 아쉽다.
  - 다음에 KAS 이용해서 사이트에서 직접 사용자 계정 만들고 관리하는 걸 개발해보고 싶다.

### 2. Smart-Contract 실행했을 때 Kaikas로 사용자가 확인하고 서명 받기
- 문제 : Caver.js 이용해서 Smart-Contract 실행하면 Kaikas 모달창이 뜨고 사용자의 서명을 받아서 Transaction이 처리돼야 하는데 Kaikas <br> 모달창이 뜨지 않았다.

- 원인
  - Caver.js 코드를 잘못 짰다. 
  - Caver.js Docs를 참고해서 코드를 짰는데 KAS를 이용한 코드여서 사용자 계정이 KAS를 이용해 만들어진 계정이어야만 Transaction이 <br> 처리됐다. Kaikas 모달창도 뜨지 않았다.
  - Kaikas에서 받은 계정은 caver.klay.accounts.wallet.add 해줘야 했다.
  - KAS로 만든 계정이 아니라 Kaikas에서 받은 계정을 이용한 것이기에 다른 방법이 필요했다.
  
- 해결 방법
  - Klaytn Developers Forum에서 답을 찾아 해결했다.
  (https://forum.klaytn.foundation/t/kaikas-smartcontract/3632)

- 아쉬운 점
  - Caver.js를 처음에 잘못 이해해서 방법을 찾는데까지 오래 걸린 것 같다.
  - 처음 공부할 때 올바른 방향에서 공부하고 있는지 확인할 필요가 있다.
  
### 3. server에 저장된 이미지를 client에서 불러오기
- 문제 : server에 저장된 이미지를 client에서 불러오려고 하는데 불러오지 못했다.

- 원인
  - server에서 DB에 이미지를 저장할 때 longblob으로 저장한다. 
  - longblob에서 client에서 쓸 수 있는 이미지 파일로 변환을 해줘야 하는데 변환이 잘 되지 않았다.
  
- 해결 방법
  - server에서 DB에 저장된 이미지 파일을 읽고 base64로 encoding한다.
  - encoding한 data를 client에서 읽을 수 있는 이미지 파일로 만들어 보낸다.
  
- 아쉬운 점
  - server와 client에서 이미지가 어떤 파일로 읽히고 존재하는지 몰라서 해결하는데 조금 오래 걸렸다.
  - 이미지처럼 크기가 큰 데이터들은 어떻게 다룰지 미리 고민해봐야 한다.

## 10. 추가로 구현하고 싶은 부분 & 수정해야 하는 부분
- 알림 기능 : 게스트가 예약할 때, 호스트가 비밀번호를 입력할 때 호스트와 게스트에게 알람이 떠 바로 알게끔 하고 싶습니다.
- 사용자 계정의 Public_key, Private_key 가지고 와서 비밀번호 암호화, 복호화 하고 싶습니다.
- 배포했을 때 웹 디자인의 크기가 로컬과 달라서 원인 찾고 수정해야 합니다.
- Heroku는 서버가 재구동되면 저장된 이미지가 사라지기 때문에 이미지를 다른 곳에 저장하고 Heroku에서 불러와야 합니다.

