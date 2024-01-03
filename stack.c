#include<stdio.h>
#include<stdlib.h>
#define maxsize 4
void push(int s[],int *top)
{
int ele;
if(*top==maxsize-1)
{
printf("Stack overflow\n");
}
else
{
printf("Enter the element to be inserted:\n");
scanf("%d",&ele);
s[++(*top)]=ele;
}
}
int pop(int s[],int *top)
{
return s[(*top)--];
}
void palindrome(int v[],int top)
{
int flag=0,i;
for(i=0;i<(top+1);i++)
{
if(v[i]==pop(v,&top))
{
flag=1;
}
else
{
flag=0;
break;
}
}
if(flag)
printf("Stack contents are palindrome:\n");
else
printf("Stack contents are not palindrome\n");
}
void display(int s[],int top)
{
if(top==-1)
{
printf("Stack overflow:\n");
}
else
{
printf("The elements of the stack are:\n");
for(int i=0;i<=top;i++)
printf("%d\n",s[i]);
}
}
void main()
{
int s[maxsize],ch,top=-1,ele;
while(1)
{
printf("Main menu\n");
printf("1.Push into stack\n2.Pop from stack\n3.Palindrome using stack\n4.Display\n5.Exit\n");
printf("Enter your choice:\n");
scanf("%d",&ch);
switch(ch)
{
case 1:push(s,&top);
       display(s,top);
       break;
case 2:if(top==-1)
       printf("Stack overflow:\n");
       else{
       ele=pop(s,&top);
       display(s,top);
       printf("the deleted element is %d",ele);
       }
       break;
case 3:palindrome(s,top);
       display(s,top);
       break;
case 4:display(s,top);
       break;
case 5:exit(1);
       break;
default :printf("Enter the valid choice:\n");
}
}
}

              
       
       
