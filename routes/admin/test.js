const bcrypt = require('bcryptjs');

const userPassword = '1239456';
const systemPassword = '$2b$10$ZEC8GOxE/K87QJ6z614e2.8urG7Y0xQ4XEXxZlvY.tujHMfr4mr/u';

// 比较密码
bcrypt.compare(userPassword, systemPassword, (err, result) => {
  if (err) {
    console.log('出错了');
    console.error(err);
    return;
  }
  if (result) {
    console.log('密码匹配');
  } else {
    console.log('密码不匹配');
  }
});

const result = bcrypt.compareSync(userPassword, systemPassword)
console.log(result)