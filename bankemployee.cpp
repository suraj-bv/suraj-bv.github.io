#include<iostream>
#include<string>
using namespace std;
class bankemployee{
	private:
		string name;
		int accountno;
		double balance;
	public:
		bankemployee(string empname,int accno,double initialbalance)
		{
			name=empname;
			accountno=accno;
			balance=initialbalance;
		}
		void printdetails(){
			cout<<"Employee name:"<<name<<endl;
			cout<<"Account number:"<<accountno<<endl;
			cout<<"Balance:"<<balance<<endl;
		}
		void withdraw(double amount)
		{
			if(amount>balance)
			{
				cout<<"Invalid balance:Insufficient funds"<<endl;
			}
			else{
				balance-=amount;
				cout<<"Withdraw successfull:new balance:"<<balance<<endl;
			}
		}
		void deposit(double amount)
		{
			balance+=amount;
			cout<<"Deposit successfull:new balance:"<<balance<<endl;
		}
};
int main(){
	string employeename;
	int accountnumber;
	double initialbalance;
	cout<<"Enter Employee name:"<<endl;
	getline(cin,employeename);
	cout<<"Enter account number:"<<endl;
	cin>>accountnumber;
	cout<<"Enter initial balance:"<<endl;
	cin>>initialbalance;
        bankemployee employee(employeename, accountnumber, initialbalance);
        employee.printdetails();
        double withdrawamount,depositamount;
        cout<<"Enter amount to withdraw:"<<endl;
        cin>>withdrawamount;
	employee.withdraw(withdrawamount);
        cout<<"Enter amount to deposit:"<<endl;
        cin>>depositamount;
        employee.deposit(depositamount);
	return 0;
}

