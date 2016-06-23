using UnityEngine;
using System.Collections;

public class zombieWalkTest01 : MonoBehaviour 
{
	public Animator zombieControl;
	public bool walkBool;

	void Start () 
	{
		zombieControl = GetComponent<Animator>();
	}
	
	void Update () 
	{
		if(Input.GetKeyDown("b"))
		{
			walkBool = !walkBool;
			zombieControl.SetBool("SwitchWalk", walkBool);
		}
	}
}
