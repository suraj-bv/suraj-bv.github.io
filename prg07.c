#include<stdio.h>
#include<stdlib.h>
struct car
{
char *carname;
char *company;
int model;
int price;
char *colour;
};
struct car *showroom(int n)
{
struct car *ncar=(struct car*)malloc(n*sizeof(struct car));
if(ncar==NULL)
{
printf("memory allocation failed:");
exit(1);
}
return ncar;
}
void readdata(struct car* ncar,int n)
{
int i;
for(i=0;i<n;i++)
{
printf("Enter the details of %d car:\n",i+1);
printf("carname:");
ncar[i].carname=(char*)malloc(20*sizeof(char));
scanf("%s",ncar[i].carname);
printf("company name:");
ncar[i].company=(char*)malloc(20*sizeof(char));
scanf("%s",ncar[i].company);
printf("model:");
scanf("%d",&ncar[i].model);
printf("price:");
scanf("%d",&ncar[i].price);
printf("colour:");
ncar[i].colour=(char*)malloc(20*sizeof(char));
scanf("%s",ncar[i].colour);
}
}
void displaydata(struct car* ncar,int n)
{
int i,j;
struct car temp;
printf("These are the available cars from price low to high:\n");
for(i=0;i<n;i++)
{
for(j=0;j<n-1;j++)
{
if((ncar[j].price)>(ncar[j+1].price))
{
temp=ncar[j];
ncar[j]=ncar[j+1];
ncar[j+1]=temp;
}
}
}
printf("carname \t company \t model \t colour \t price\n");
for(i=0;i<n;i++)
{
printf("%s \t %s \t %d \t %s \t %d\n",ncar[i].carname,ncar[i].company,ncar[i].model,ncar[i].colour,ncar[i].price);
}
}
void freememory(struct car *ncar,int n)
{
int i;
for(i=0;i<n;i++)
{
free(ncar[i].carname);
free(ncar[i].company);
free(ncar[i].colour);
}
free(ncar);
}
int main()
{
int n;
printf("Enter the no. of cars:");
scanf("%d",&n);
struct car *ncar=showroom(n);
readdata(ncar,n);
displaydata(ncar,n);
freememory(ncar,n);
}
