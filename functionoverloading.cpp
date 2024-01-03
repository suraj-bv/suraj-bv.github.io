#include<iostream>
using namespace std;
int add(int a,int b)
{
	return a+b;
}
double add(double a,double b)
{
	return a+b;
}
int main(){
	int x=5,y=10;
	double p=2.5,q=3.7;
	int result1=add(x,y);
	double result2=add(p,q);
	cout<<"Result of adding integers:"<<result1<<endl;
	cout<<"Result of adding doubles:"<<result2<<endl;
	return 0;
}
