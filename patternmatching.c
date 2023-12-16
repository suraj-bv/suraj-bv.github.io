#include<stdio.h>
#include<string.h>
void readdata(char str[100],char pat[50],char rep[50])
{
printf("Enter the main string:\n");
gets(str);
printf("Enter the pattern string:\n);
gets(pat);
printf("Enter the replace string:\n);
gets(rep);
}
void patternmatching(char str[100],char pat[50],char rep[50])
{
int i=0,j=0,c=0,m=0,k=0,flag=0;
char ans[100];
while(str[c]!='\0')
{
if(str[m]==pat[i])
{
i++,m++;
flag=1;
if(pat[i]=='\0')
{
for(k=0;rep[k]!='\0';k++,j++)
ans[j]=rep[k];
i=0;c=m;
}
}
else{
ans[j]=str[c];
j++;c++;
m=c,i=0;
}
}
if(flag==0)
printf("Pattern does'nt match:");
else{
ans[j]='\0';
printf("The resultant string is %s",ans);
}
}
int main()
{
char str[100],rep[50],pat[50];
readdata(str,pat,rep);
patternmatching(str,pat,rep);
return 0;
}
