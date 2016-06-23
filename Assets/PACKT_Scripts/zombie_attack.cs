using UnityEngine;
using System.Collections;

public class zombie_attack : MonoBehaviour {
	public Animator thisAnimator;

	void Start () 
	{
		thisAnimator = GetComponent<Animator>();
	}
	
	void Update () 
	{
		if(Input.GetButton("Fire1"))
		{
			thisAnimator.SetTrigger("Hits");
		}
	}
}
